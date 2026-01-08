import express, { Request, Response } from "express";
import cors from "cors";
import { generateProof } from "./generateProof";
import { Buffer } from "buffer";

const app = express();

app.use(cors());
app.use(express.json());


app.post("/prove", async (req: Request, res: Response) => {
  try {
    const { given, solution } = req.body;
    const { proof, publicInputs } = await generateProof(given, solution);
    console.log(given);
    console.log(solution);

    const proofHex = Buffer.from(proof).toString("hex");

    res.json({
      proof: "0x" + proofHex,
      publicInputs,
   });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "proof generation failed" });
  }
});

app.listen(3001, () => {
  console.log("prover server is running on port 3001");
});