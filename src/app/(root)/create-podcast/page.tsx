'use client';

import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

import { useState } from 'react';

import { Loader } from 'lucide-react';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import GeneratePodcast from '@/components/genergatePodcast/GeneratePodcast';
import GenerateThumbnail from '@/components/generateThumbnail/GenerateThumbnail';

const voiceCategories = ['alloy', 'shimmer', 'nova', 'echo', 'fable', 'onyx'];

const formSchema = z.object({
    podcastTitle: z.string().min(2, {
        message: 'Podcast Title must be at least 2 characters.',
    }),
    podcastDescription: z.string().min(5, {
        message: 'Podcast Description must be at least 5 characters.',
    }),
});

const CreatePodcast = () => {
    const [voiceType, setVoiceType] = useState<string>();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            podcastTitle: '',
            podcastDescription: '',
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }

    return (
        <section className="mt-9 flex flex-col gap-9">
            <h1 className="text-20 font-bold text-white-1">CreatePodcast</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-12 flex flex-col">
                    <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
                        <FormField
                            control={form.control}
                            name="podcastTitle"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2.5">
                                    <FormLabel className="text-16 font-bold text-white-1">
                                        Title
                                    </FormLabel>
                                    <FormControl className="input-class focus-visible:ring-orange-1">
                                        <Input placeholder="title" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-white-1" />
                                </FormItem>
                            )}
                        />
                        <div className="flex flex-col gap-2.5">
                            <Label className="text-16 font-bold text-white-1">
                                Select AI Voice
                            </Label>
                            <Select onValueChange={(val) => setVoiceType(val)}>
                                <SelectTrigger
                                    className={cn(
                                        'text-16 w-full border-none bg-black-1 text-gray-1',
                                    )}
                                >
                                    <SelectValue
                                        className="placeholder:text-gray-1"
                                        placeholder="Select AI Voice"
                                    />
                                </SelectTrigger>
                                <SelectContent className="text-16 border-none bg-black-1 font-bold text-white-1 focus-visible:ring-orange-1">
                                    {voiceCategories.map((item) => {
                                        return (
                                            <SelectItem
                                                value={item}
                                                key={item}
                                                className="capitalize focus:bg-orange-1"
                                            >
                                                {item}
                                            </SelectItem>
                                        );
                                    })}
                                </SelectContent>
                                {voiceType && (
                                    // eslint-disable-next-line jsx-a11y/media-has-caption
                                    <audio src={`/${voiceType}.mp3`} autoPlay className="hidden" />
                                )}
                            </Select>
                        </div>
                        <FormField
                            control={form.control}
                            name="podcastDescription"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2.5">
                                    <FormLabel className="text-16 font-bold text-white-1">
                                        Description
                                    </FormLabel>
                                    <FormControl className="input-class focus-visible:ring-orange-1">
                                        <Textarea placeholder="description" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-white-1" />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-col pt-10">
                        <GeneratePodcast />
                        <GenerateThumbnail />
                        <div className="mt-10 w-full">
                            <Button
                                type="submit"
                                className="text-16 w-full bg-orange-1 py-4 font-extrabold text-white-1
                                transition-all duration-500 hover:bg-black-1"
                            >
                                {isSubmitting ? (
                                    <>
                                        Submitting
                                        <Loader size={20} className="animate-spin mr-2" />
                                    </>
                                ) : (
                                    'Publish Post'
                                )}
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
        </section>
    );
};

export default CreatePodcast;
