/**
 * src/frontend/features/pill/components/detail.tsx
 *
 * espone il contenuto dettagliato di una pillola.
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { carouselFileUploadInputTheme } from "@/frontend/lib/flowbite";
import { apiClient } from "@/frontend/lib/trpc/client";
import { ErrorCard, LoadingBar } from "@/frontend/ui/status";
import { mime } from "@/shared/lib/mime";
import { buildPublicUrl } from "@/shared/utils/url";
import { Carousel } from "flowbite-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// ------------------------------------------------------------------------------------------------

type ContentProps = {
  id: number;
};

// ------------------------------------------------------------------------------------------------

export const PillContent = (props: ContentProps): React.JSX.Element => {
  const { id } = props;

  // navigazione
  const router = useRouter();

  // chiamate api
  const [trackSent, setTrackSent] = useState<boolean>(false);

  const pill = apiClient.privatePill.get.useQuery({ id });
  const setTrack = apiClient.privatePill.setTrack.useMutation();
  const apiCache = apiClient.useUtils();

  // invia il track di visualizzazione al primo caricamento del contenuto.
  useEffect(() => {
    if (!trackSent) {
      setTrack
        .mutateAsync({ id })
        .then((response) => {
          console.log("setTrack success", response);
          setTrackSent(true);
        })
        .catch(console.error);
    }
  }, [trackSent, props.id]);

  if (pill.isLoading) return <LoadingBar />;
  if (pill.error) return <ErrorCard error={pill.error.message} />;

  // espone i contenuti di una pillola.
  // restituisce i tag immagini / video per esporre i file caricati.
  const showContent = (content: string): React.JSX.Element | undefined => {
    const fileMime = mime.getType(content);
    if (fileMime) {
      if (fileMime.includes("image/")) {
        // restituisce un tag immagine.
        return (
          <img
            src={buildPublicUrl(content)}
            className="h-auto max-h-full w-auto rounded-md"
            alt={content}
            key={content}
          />
        );
      } else if (fileMime.includes("video/")) {
        // restituisce un tag video.
        return (
          <video
            key={content}
            className="h-auto max-h-full w-auto rounded-md"
            controls={true}
            controlsList="nofullscreen nodownload noremoteplayback noplaybackrate"
            disablePictureInPicture={true}
            disableRemotePlayback={true}
          >
            <source src={buildPublicUrl(content)} />
          </video>
        );
      }
    }
  };

  // thumb della pillola
  const thumbPath = pill.data.thumbPath ? pill.data.thumbPath : "/default-thumb.png";

  return (
    <div className="w-full">
      <div className="grid grid-cols-[1fr,3fr] gap-12">
        <img src={thumbPath} className="h-auto max-h-96 w-full  rounded-2xl" />
        <div className="p-5 text-lg text-black">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {pill.data.title}
          </h5>
          <p>{pill.data.description}</p>
        </div>
      </div>
      <hr className="my-6" />
      <div className="h-80 w-full">
        <Carousel theme={carouselFileUploadInputTheme} slide={false}>
          {pill.data.content.map(showContent)}
        </Carousel>
      </div>
    </div>
  );
};
