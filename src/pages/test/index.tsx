/**
 * src/pages/admin/pill/index.tsx
 *
 * Esperimento: upload file
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { FileUploadInput } from "@/frontend/components/file-upload";
import { uploadPillContentConfig, uploadPillThumbConfig } from "@/shared/features/pill/schema";
import { DateTime } from "luxon";
import { useMemo } from "react";

export const UploadPage = () => {
  const tmpDir = useMemo(() => "tmp-" + DateTime.now().toFormat("HHmmss"), []);

  return (
    <>
      <div className="mx-auto w-full px-5 py-12 lg:w-[32rem]">
        <h3 className="my-8 text-center text-2xl font-bold">Upload immagine singola</h3>
        <FileUploadInput
          name="thumb"
          value="default.jpg"
          config={uploadPillThumbConfig}
          tmpDir={tmpDir}
        />
        <hr className="my-8" />
        <h3 className="my-8 text-center text-2xl font-bold">Upload immagini/video multiple</h3>
        <FileUploadInput name="content" config={uploadPillContentConfig} tmpDir={tmpDir} />
      </div>
    </>
  );
};

export default UploadPage;
