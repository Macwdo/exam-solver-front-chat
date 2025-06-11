"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { sendDocument } from "../services";
import { useExamStore } from "@/lib/store";
import { LoaderCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getExams } from "../services";

const DocumentForm = () => {
    const { refetch, isLoading } = useQuery({
        queryKey: ['exams'],
        queryFn: getExams,
        refetchInterval: 10000,
    });
    const { setSelectedExam, selectedExam, incrementRefreshId } = useExamStore();

    const [errorMessage, setErrorMessage] = useState("");
    const textRef = useRef<HTMLTextAreaElement>(null);

    const onSubmit = async () => {
        const value = textRef.current?.value
        if (!value) {
            setErrorMessage("Por favor, preencha o campo de texto");
            return;
        };

        if (!selectedExam) {
            setErrorMessage("Por favor, selecione um exame");
            return;
        };

        if (value && selectedExam) {
            await sendDocument(value, selectedExam.id);
            refetch();
            setSelectedExam(null);
            incrementRefreshId();
            textRef.current!.value = "";
            setErrorMessage("");
        }

    };

    return (
        <div className="flex flex-col gap-2">
            <div className="w-full gap-2 flex flex-col items-start">
                <Textarea
                    ref={textRef}
                    spellCheck={false}
                    className="min-h-[100px] rounded-none"
                />
                {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
            </div>
            <div className="flex justify-between items-center">
                {isLoading && <LoadingButton />}
                {!isLoading && <Button onClick={onSubmit} className="rounded-none">Enviar</Button>}
            </div>
        </div >
    );
};

const LoadingButton = () => {
    return (
        <Button disabled className="rounded-none">
            <LoaderCircle className="w-4 h-4 animate-spin" />
            Enviando
        </Button>
    )
}

export default DocumentForm;
