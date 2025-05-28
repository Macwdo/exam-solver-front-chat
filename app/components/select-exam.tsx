"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useEffect } from "react";
import { Exam, getExams } from "../services";




const SelectExam = ({ setExam }: { setExam: (exam: Exam) => void }) => {
    const [exams, setExams] = useState<Exam[]>([])

    useEffect(() => {
        const fetchExams = async () => {
            setExams(await getExams())
        }
        fetchExams()
    }, [])

    const onSelect = (value: string) => {
        const selectedExam = exams.find((exam) => exam.id.toString() === value)
        if (selectedExam) {
            setExam(selectedExam)
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "not_started":
                return <div className="w-2 h-2 bg-gray-500 rounded-full" />
            case "processing":
                return <div className="w-2 h-2 bg-yellow-500 rounded-full" />
            case "completed":
                return <div className="w-2 h-2 bg-green-500 rounded-full" />
            case "failed":
                return <div className="w-2 h-2 bg-red-500 rounded-full" />
        }
    }

    return (
        <Select onValueChange={(value) => onSelect(value)}>
            <SelectTrigger>
                <SelectValue placeholder="Selecione um exame" />
            </SelectTrigger>
            {exams.length === 0 && (
                <SelectContent>
                    <SelectItem value="loading">Carregando...</SelectItem>
                </SelectContent>
            )}

            {exams.length > 0 && (
                <SelectContent>
                    {exams.map((exam, index) => (
                        <SelectItem key={index} value={exam.id.toString()} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                {exam.name}
                                {getStatusIcon(exam.status)}
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            )}
        </Select>
    )
}
export default SelectExam