const API_URL = process.env.NEXT_PUBLIC_API_URL

export type Alternative = {
    letter: string
    text: string
}


export type Answer = {
    number: number
    question: string
    answer: Alternative
    alternatives: Alternative[]
}

export type Exam = {
    id: number
    name: string
    answer: Answer[] | null
    status: ExamStatus
    is_blocked: boolean
}

export type ExamStatus = "not_started" | "processing" | "completed" | "failed" | "blocked"


const sendDocument = async (document: string, examId: number) => {

    await fetch(`${API_URL}/upload-documents/${examId}/`, {
        method: "POST",
        body: JSON.stringify({ file: document }),
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const getExams = async (): Promise<Exam[]> => {
    const response = await fetch(`${API_URL}/exams/`)
    const data = await response.json()

    return data
}


export { sendDocument, getExams }