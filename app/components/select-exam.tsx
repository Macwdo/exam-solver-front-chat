"use client"

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Exam, getExams } from "../services";
import { useExamStore } from "@/lib/store";
import { LockIcon, RefreshCcwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const EXAM_STATUSES = ["not_started", "blocked", "processing", "completed", "failed"] as const;

type ExamStatus = typeof EXAM_STATUSES[number];

type SelectExamProps = {
    exams: Exam[],
}

const STATUS_LABELS: Record<ExamStatus, string> = {
    not_started: "Não iniciado",
    blocked: "Bloqueado",
    processing: "Processando",
    completed: "Completo",
    failed: "Falhou",
};

function StatusDot({ status }: { status: Exam["status"] }) {
    const colorMap: Record<string, string> = {
        not_started: "bg-gray-500",
        processing: "bg-yellow-500",
        completed: "bg-green-500",
        failed: "bg-red-500",
    };
    if (!colorMap[status]) return null;
    return <div className={`w-2 h-2 rounded-full ${colorMap[status]}`} />;
}

function isExamBlocked(exam: Exam) {
    return exam.is_blocked || exam.status === "processing";
}

function ExamStatusIcon({ exam }: { exam: Exam }) {
    const blocked = isExamBlocked(exam);
    const processing = exam.status === "processing";
    if (blocked && !processing) return <LockIcon className="w-4 h-4" />;
    return <StatusDot status={exam.status} />;
}

const SelectExam = ({ exams }: SelectExamProps) => {
    const { setSelectedExam, refreshId, incrementRefreshId } = useExamStore();
    const { refetch, isRefetching } = useQuery({
        queryKey: ['exams'],
        queryFn: getExams,
        refetchInterval: 10000,
    });


    const handleSelect = (value: string) => {
        const selectedExam = exams.find((exam) => exam.id.toString() === value);
        if (!selectedExam) return;

        setSelectedExam(selectedExam);
    };

    const handleRefresh = () => {
        refetch();
        setSelectedExam(null);
        incrementRefreshId();
    };

    return (
        <div className="w-full flex items-center justify-between gap-2">
            <SelectExamInput
                key={refreshId}
                exams={exams}
                handleSelect={handleSelect}
            />
            <RefreshButton handleRefresh={handleRefresh} isRefetching={isRefetching} />
        </div>
    );
};

const RefreshButton = ({ handleRefresh, isRefetching }: { handleRefresh: () => void, isRefetching: boolean }) => {

    return (
        <Button className="rounded-none" onClick={handleRefresh} disabled={isRefetching}>
            <RefreshCcwIcon className={`w-4 h-4 ${isRefetching ? "animate-spin" : ""}`} />
        </Button>
    );
};


const SelectExamInput = ({ exams, handleSelect }: { exams: Exam[], handleSelect: (value: string) => void }) => {
    return (

        <Select onValueChange={handleSelect}>
            <SelectTrigger className="rounded-none">
                <SelectValue placeholder="Selecione um exame" />
            </SelectTrigger>
            <SelectExamContent exams={exams} />
        </Select>
    )
}

const SelectExamContent = ({ exams }: { exams: Exam[] }) => {
    return (
        <SelectContent className="rounded-none">
            {EXAM_STATUSES.map((status) => {
                const examsByStatus = exams.filter((exam) => exam.status === status);
                if (examsByStatus.length === 0) return null;
                return (
                    <SelectGroup key={status}>
                        <div className="px-2 py-1 text-xs font-semibold text-gray-500">
                            {STATUS_LABELS[status]}
                        </div>
                        {examsByStatus.map((exam) => (
                            <SelectItem
                                key={exam.id}
                                value={exam.id.toString()}
                                className="flex items-center justify-between"
                                disabled={isExamBlocked(exam)}
                            >
                                <div className="flex items-center gap-2">
                                    {exam.name}
                                    <ExamStatusIcon exam={exam} />
                                </div>
                            </SelectItem>
                        ))}
                    </SelectGroup>
                );
            })}
        </SelectContent>
    );
};

export default SelectExam;