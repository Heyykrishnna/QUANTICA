import React from "react";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";

export function DraggableCardDemo() {
  const items = [
    {
      title: "Excellence",
      image: "https://gamesbeat.com/wp-content/uploads/2025/05/esl-on.jpg",
    },
    {
      title: "Community",
      image:
        "https://www.bmw.com/content/dam/bmw/marketBMWCOM/bmw_com/categories/performance/esports/es-01-stage-hd.jpg?imwidth=1440",
    },
    {
      title: "Competition",
      image:
        "https://c.ndtvimg.com/2024-07/gn5damn_esports_625x300_12_July_24.jpg?im=FitAndFill,algorithm=dnn,width=806,height=605",
    },
    {
      title: "Innovation",
      image:
        "https://static.wixstatic.com/media/f99520_e034b77ce9ca463faaf70b4633b021f5~mv2.jpg/v1/fit/w_363,h_2352,q_90,enc_avif,quality_auto/f99520_e034b77ce9ca463faaf70b4633b021f5~mv2.jpg",
    },
    {
      title: "Gaming",
      image:
        "https://aesf-files.sgp1.digitaloceanspaces.com/cache/widen/63c6322a09b04_11450-apzfjlazmu-1564120794.jpg_1900x0.webp",
    },
    {
      title: "Fair Play",
      image:
        "https://static.wixstatic.com/media/f47592_c0bbfb4b44f54991a66416cfce8bff19~mv2.jpg/v1/fit/w_841,h_679,q_90,enc_avif,quality_auto/f47592_c0bbfb4b44f54991a66416cfce8bff19~mv2.jpg",
    },
    {
      title: "Integrity",
      image:
        "https://und.edu/blog/_files/images/230927-esports-6267-rss.webp",
    },
    {
      title: "Transparency",
      image:
        "https://ksandk.com/wp-content/uploads/gvbd5btrqea.jpg",
    },
  ];

  const [positions, setPositions] = React.useState<
    Array<{ top: number; left: number; rotate: number }>
  >([]);

  React.useEffect(() => {
    const newPositions = items.map(() => ({
      top: Math.random() * 40,
      left: Math.random() * 60 + 10,
      rotate: Math.random() * 20 - 10,
    }));
    setPositions(newPositions);
  }, []);

  return (
    <DraggableCardContainer className="relative flex min-h-screen w-full items-center justify-center overflow-clip">
      <p className="absolute top-80 mx-auto max-w-md -translate-y-3/4 text-center text-4xl font-black text-neutral-400 md:text-4xl dark:text-neutral-800">
        No warm-ups. No excuses. If you are here, you compete.
      </p>
      {items.map((item, index) => (
        <DraggableCardBody
          key={item.title}
          className="absolute"
          style={{
            top: positions[index] ? `${positions[index].top}%` : "50%",
            left: positions[index] ? `${positions[index].left}%` : "50%",
            rotate: positions[index] ? `${positions[index].rotate}deg` : "0deg",
            zIndex: index,
          }}
        >
          <img
            src={item.image}
            alt={item.title}
            className="pointer-events-none relative z-10 h-80 w-80 object-cover"
          />
          <h3 className="mt-4 text-center text-2xl font-bold text-white dark:text-neutral-300">
            {item.title}
          </h3>
        </DraggableCardBody>
      ))}
    </DraggableCardContainer>
  );
}

export default DraggableCardDemo;