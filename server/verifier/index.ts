import express, {Request, Response} from "express";
import { verifySudoku } from "./verifier";
import cors from "cors";
import { Buffer } from "buffer";

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.post("/verify", async (req: Request, res: Response) => {
    try {
        const {proof, publicInputs} = req.body;
        const proofBytes = Uint8Array.from(
            Buffer.from(proof.slice(2), "hex")
        );
        console.log(proofBytes);
        const result = await verifySudoku(proofBytes, publicInputs);
        console.log(result);
        return res.json({result: result});

    } catch(error){
        console.error(error);
    res.status(500).json({ error: "Verification failed" });
    }
});

app.listen(3002, () => {
  console.log("verifier server is running on port 3002");
});