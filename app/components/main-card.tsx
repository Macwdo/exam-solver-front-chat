'use client'

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import SelectExam from "./select-exam";
import DocumentForm from "./document-form";
import { Exam } from "../services";
import ListAnswers from "./list-answers";
import { useState } from "react";



const MainCard = () => {
    const [exam, setExam] = useState<Exam | null>(null)

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <div className="flex items-center justify-center">
                    <SelectExam setExam={setExam} />
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid w-full gap-1.5">
                    {exam && exam.answer && <ListAnswers answers={exam.answer} />}
                    {exam && exam.answer === null && exam.status !== "processing" && <DocumentForm exam={exam} />}
                    {exam && exam.status === "processing" && <div>Processing...</div>}
                </div>
            </CardContent>
        </Card>
    )
}


export default MainCard;