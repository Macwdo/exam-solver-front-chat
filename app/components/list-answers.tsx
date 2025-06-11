import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Answer } from "../services";

const ListAnswers = ({ answers }: { answers: Answer[] | null }) => {

    return (
        <Table className="border">
            <TableHeader>
                <TableRow>
                    <TableHead>Número</TableHead>
                    <TableHead>Alternativa</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {answers?.map((answer, i) => (
                    <TableRow key={i}>
                        <TableCell>{answer.number}</TableCell>
                        <TableCell>{answer.answer.letter}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default ListAnswers;