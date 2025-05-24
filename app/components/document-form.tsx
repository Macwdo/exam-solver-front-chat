"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const Status = () => (
    <div className="flex items-center gap-2">
        <p>Status</p>
        <div className="w-2 h-2 bg-green-500 rounded-full" />
    </div>
);

const DocumentForm = () => {
    const textRef = useRef<HTMLTextAreaElement>(null);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const value = textRef.current?.value ?? "";
        console.log("submit", value.length, "characters");
        textRef.current!.value = "";
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-2">
                <div className="w-full items-center gap-1.5">
                    <Textarea
                        ref={textRef}
                        defaultValue=""
                        placeholder="Paste a large document here…"
                        spellCheck={false}          // ⬅ can save lots of CPU on huge input
                        className="min-h-[200px]"   // give it some breathing room
                    />
                </div>

                <div className="flex justify-between items-center">
                    <Button type="submit">Enviar</Button>
                    <Status />
                </div>
            </div>
        </form>
    );
};

export default DocumentForm;
