import express, { Request, Response } from "express";
import cors from "cors";
import { generateProof } from "./generateProof";

const app = express();

app.use(cors());
app.use(express.json());

function uint8ArrayToHex(bytes: Uint8Array): `0x${string}` {
  return ("0x" + Buffer.from(bytes).toString("hex")) as `0x${string}`;
}

app.post("/prove", async (req: Request, res: Response) => {
  try {
    const { given, solution } = req.body;


    const { proof, publicInputs } = await generateProof(given, solution);

    res.json({ proof: uint8ArrayToHex(proof), publicInputs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "proof generation failed" });
  }
});

app.listen(3001, () => {
  console.log("server is running on port 3001");
});