"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Exam, sendDocument } from "../services";



const DocumentForm = ({ exam }: { exam: Exam }) => {
    const textRef = useRef<HTMLTextAreaElement>(null);

    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        setLoading(true);

        const value = textRef.current?.value;
        if (value && exam) {
            await sendDocument(value, exam.id);
            textRef.current!.value = "";
            setLoading(false);
            setSent(true);
        }

    };


    if (sent) {
        return <div>Enviado com sucesso!</div>
    }


    return (
        <div className="flex flex-col gap-2">
            <div className="w-full items-center gap-2">
                <Textarea
                    ref={textRef}
                    defaultValue=""
                    placeholder="Paste a large document here…"
                    spellCheck={false}
                    className="min-h-[200px]"
                />
            </div>
            <div className="flex justify-between items-center">
                {
                    exam === null && (
                        <Button disabled>
                            Selecione um exame
                        </Button>
                    )
                }
                {
                    exam !== null && (
                        <Button onClick={onSubmit} disabled={loading}>
                            {loading ? "Enviando..." : "Enviar"}
                        </Button>
                    )
                }
            </div>
        </div >
    );
};

export default DocumentForm;
