import { Button } from "@/components/ui/button"
import { Dropzone, FileItem } from "@/components/ui/file-upload"
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
import { SubHead } from "../_components/showcase"

export function FileUploadSection() {
  return (
    <Section
      id="file-upload"
      num="Component"
      title="File upload"
      description={
        <>
          A drag-and-drop dropzone with a click-to-browse fallback — the heart of KYC document
          capture (driver&rsquo;s licence, passport, proof of address). Shows per-file progress,
          success, and error states. Always state accepted formats and the size cap up front.
        </>
      }
    >
      <SubHead title="Dropzone" hint="idle · drag-active · error" />
      <div className="flex max-w-[480px] flex-col gap-4">
        <Dropzone
          state="idle"
          title={
            <>
              <b>Click to upload</b> or drag and drop
            </>
          }
          hint="JPG, PNG or PDF · up to 10MB"
        />
        <Dropzone state="dragging" title="Drop to upload" hint="Release anywhere in this zone" />
        <Dropzone
          state="error"
          title="File too large"
          hint="drivers-licence.png is 14MB · max 10MB"
        />
      </div>

      <SubHead title="File list" hint="thumbnail · name · size · state" />
      <div className="flex max-w-[480px] flex-col gap-2">
        <FileItem
          kind="image"
          name="drivers-licence-front.jpg"
          sub="2.4 MB of 4.1 MB · 58%"
          progress={58}
          status="uploading"
        />
        <FileItem
          kind="image"
          name="drivers-licence-back.jpg"
          sub="3.8 MB · uploaded"
          status="done"
        />
        <FileItem
          kind="doc"
          name="proof-of-address.pdf"
          sub="Upload failed · file is password protected"
          status="error"
        />
      </div>

      <SubHead title="In context" hint="the identity step of signup" />
      <Card className="max-w-[480px]">
        <CardHeader>
          <div>
            <CardEyebrow>Step 3 of 5 — Identity</CardEyebrow>
            <CardTitle>Upload your driver&rsquo;s licence</CardTitle>
            <CardDescription>
              Front and back. We verify electronically with the DIA.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Dropzone
            state="idle"
            title={
              <>
                <b>Click to upload</b> or drag and drop
              </>
            }
            hint="JPG, PNG or PDF · up to 10MB each"
          />
          <FileItem kind="image" name="licence-front.jpg" sub="3.8 MB · uploaded" status="done" />
        </CardContent>
        <CardFooter className="justify-between border-t-0 pt-0">
          <Button variant="ghost">Back</Button>
          <Button>Continue</Button>
        </CardFooter>
      </Card>
    </Section>
  )
}
