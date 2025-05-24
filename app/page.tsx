import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea"
import SelectExam from "./components/select-exam";
import DocumentForm from "./components/document-form";



export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-center">
            <SelectExam />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid w-full gap-1.5">
            <DocumentForm />
          </div>
        </CardContent>
      </Card>
    </div >
  );
}
