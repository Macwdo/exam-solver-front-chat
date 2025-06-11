'use client'

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import SelectExam from "./select-exam";
import DocumentForm from "./document-form";
import { getExams } from "../services";
import ListAnswers from "./list-answers";
import { LoaderCircle } from "lucide-react";
import { useExamStore } from "@/lib/store";
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

const queryClient = new QueryClient();

const MainCard = () => {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <MainCardContent />
            </QueryClientProvider>
        </>
    )
}

const MainCardContent = () => {
    const { selectedExam } = useExamStore();
    const { data: exams = [], isLoading } = useQuery({
        queryKey: ['exams'],
        queryFn: getExams,
    });

    const isProcessing = selectedExam && selectedExam.status === "processing"
    const shouldShowDocumentForm = selectedExam && selectedExam.answer === null && !isProcessing
    const shouldShowListAnswers = selectedExam && selectedExam.answer;

    if (isLoading) {
        return <Loading />
    }
    if (!isLoading) {
        return (
            <Card className="shadow-2xl drop-shadow-lg bg-zinc-100 rounded-none border-none w-full max-w-lg">
                <CardHeader>
                    <div className="flex items-center justify-center">
                        <SelectExam exams={exams} />
                    </div>
                </CardHeader>
                {shouldShowDocumentForm && <DocumentFormContent />}
                {shouldShowListAnswers && <ListAnswersContent />}
            </Card>
        )
    }
}

const DocumentFormContent = () => {
    return (
        <WrapCardContent>
            <DocumentForm />
        </WrapCardContent>
    )
}

const ListAnswersContent = () => {
    const { selectedExam } = useExamStore();
    return (
        <WrapCardContent>
            <ListAnswers answers={selectedExam?.answer ?? null} />
        </WrapCardContent>
    )
}

const Loading = () => {
    return (
        <div className="flex items-center justify-center">
            <LoaderCircle color="#fff" size={80} strokeWidth={1} className="animate-spin" />
        </div>
    )
}

const WrapCardContent = ({ children }: { children: React.ReactNode }) => {
    return (
        <CardContent>
            <div className="grid w-full gap-1.5">
                {children}
            </div>
        </CardContent>
    )
}



export default MainCard;