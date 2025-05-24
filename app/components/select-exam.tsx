"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useEffect } from "react";


const exams = [
    { id: 1, name: "Exame 1" },
    { id: 2, name: "Exame 2" },
    { id: 3, name: "Exame 3" }
]

type Exam = {
    id: number
    name: string
}

const getExams = async (): Promise<Exam[]> => {
    return await new Promise((resolve) => setTimeout(() => resolve(exams), 2000))
}

const SelectExam = () => {
    const [exam, setExam] = useState<Exam[]>([])

    useEffect(() => {
        const fetchExams = async () => {
            const exams = await getExams()
            setExam(exams)
        }
        fetchExams()
    }, [])

    return (
        <Select>
            <SelectTrigger>
                <SelectValue placeholder="Selecione um exame" />
            </SelectTrigger>
            <SelectContent>
                {exam.length === 0 && (
                    <SelectItem disabled value="loading">Carregando...</SelectItem>
                )}
                {exam.map((exam) => (
                    <SelectItem key={exam.id} value={exam.id.toString()}>
                        {exam.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
export default SelectExam