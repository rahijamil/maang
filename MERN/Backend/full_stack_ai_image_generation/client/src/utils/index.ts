import FileSaver from 'file-saver';
import { surpriseMePrompts } from "../constants";

export const getRandomPrompt = (prompt: string) => {
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);

    const randomPrompt = surpriseMePrompts[randomIndex];

    return randomPrompt
}
export async function downloadImage(_id: string, photo: string) {
    FileSaver.saveAs(photo, `download-${_id}.jpg`);
}