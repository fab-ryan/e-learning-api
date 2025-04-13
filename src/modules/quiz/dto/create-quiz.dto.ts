import { ApiProperty } from "@nestjs/swagger";

export class CreateQuizDto {
    @ApiProperty({
        example: 'Quiz Title',
        description: 'Quiz title must be listed'
    })
    title: string;
    @ApiProperty({
        example: 'Quiz Description',
        description: 'Quiz description'
    })
    description?: string;
    @ApiProperty({
        example: [
            {
                text: 'Question 1',
                type: 'MCQ',
                options: [
                    { text: 'Option A', isCorrect: true },
                    { text: 'Option B', isCorrect: false },
                    { text: 'Option C', isCorrect: false },
                    { text: 'Option D', isCorrect: false }
                ]
            },
            {
                text: 'Question 2',
                type: 'TEXT',
                correctAnswers: ['Answer 1']
            }
        ]
    })
    questions: {
        text: string;
        type: 'MCQ' | 'TEXT';
        options?: {
            text: string;
            isCorrect: boolean;
        }[];
        correctAnswers?: string[];
    }[];

}
