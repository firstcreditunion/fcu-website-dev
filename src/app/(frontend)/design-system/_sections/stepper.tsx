import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Stepper, type StepItem } from "@/components/ui/stepper"
import {
  Card,
  CardHeader,
  CardEyebrow,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Section } from "../_components/section"
import { Demo, SubHead } from "../_components/showcase"

const signup: StepItem[] = [
  { title: "Account type", description: "Everyday selected" },
  { title: "Personal details", description: "Name & IRD" },
  { title: "Identity", description: "Upload your ID" },
  { title: "Funding", description: "Initial deposit" },
  { title: "Review", description: "Confirm & open" },
]

const compact: StepItem[] = [
  { title: "Details" },
  { title: "Identity" },
  { title: "Review" },
]

const vertical: StepItem[] = [
  { title: "Account type", description: "Everyday Saver" },
  { title: "Personal details", description: "Mereana Te Awa" },
  { title: "Identity", description: "Driver's licence" },
  { title: "Funding" },
  { title: "Review" },
]

export function StepperSection() {
  return (
    <Section
      id="stepper"
      num="Component"
      title="Stepper"
      description={
        <>
          A labelled progress indicator for multi-step flows — membership signup, loan applications,
          scheduled-transfer wizards. Unlike the Progress bar, the stepper names each stage so the
          member always knows where they are and what&rsquo;s left.
        </>
      }
    >
      <SubHead title="Horizontal" hint="completed fill primary · active outlined" />
      <Demo>
        <Stepper steps={signup} current={2} />
      </Demo>
      <Demo>
        <Stepper steps={compact} current={1} />
      </Demo>

      <SubHead title="Vertical" hint="progress rail beside the active form" />
      <div className="grid gap-8 sm:grid-cols-[220px_1fr]">
        <Stepper steps={vertical} current={2} orientation="vertical" />
        <Card className="shadow-none">
          <CardHeader>
            <div>
              <CardEyebrow>Step 3 of 5</CardEyebrow>
              <CardTitle>Verify your identity</CardTitle>
              <CardDescription>
                Upload a photo of your driver&rsquo;s licence or passport.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-foreground">Document type</label>
              <Input defaultValue="NZ Driver's licence" readOnly />
            </div>
          </CardContent>
          <CardFooter className="justify-between border-t-0 pt-0">
            <Button variant="ghost">Back</Button>
            <Button>Continue</Button>
          </CardFooter>
        </Card>
      </div>
    </Section>
  )
}
