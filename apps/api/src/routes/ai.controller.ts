import { Body, Controller, Post } from "@nestjs/common";
import { z } from "zod";

const ReqSchema = z.object({
  scope: z.enum(["pageStudio","flowOverlay","validation","dataApiStudio"]),
  intent: z.enum(["proposeCommands","explain","proposeFix"]),
  prompt: z.string().min(1),
  context: z.any()
});

@Controller()
export class AiController {
  @Post("/ai/assist")
  assist(@Body() body: unknown) {
    const parsed = ReqSchema.parse(body);
    const requestId = `req_${Math.random().toString(36).slice(2)}`;

    if (parsed.intent === "explain") {
      return { requestId, mode: "explain", explanation: "AI explain stub (wire gateway later)" };
    }

    return {
      requestId,
      mode: "commands",
      proposals: [{
        id: "batch_demo",
        title: "Demo: Add Home page",
        summary: "Adds a page named Home (scaffold).",
        risk: "low",
        commands: [{ type: "AddPage", payload: { name: "Home" } }]
      }]
    };
  }
}
