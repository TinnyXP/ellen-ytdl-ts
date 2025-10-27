"use client";

import { useState, useEffect } from "react";
import { Button, Input, Card, CardBody, Divider, Tooltip, Spinner } from "@heroui/react";
import { AnimatePresence, m, LazyMotion, domAnimation } from "framer-motion";
import { FiDownload, FiX, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import FormatSelector from "@/components/FormatSelector";
import QualitySelector from "@/components/QualitySelector";
import { FaLink, FaPaste } from "react-icons/fa6";
import { FaSyncAlt } from "react-icons/fa";

type Step = 0 | 1 | 2;

interface VideoInfo {
  title: string;
  thumbnail: string;
  duration: string;
  channel: string;
}

export default function Page() {
  const [[step, direction], setStep] = useState<[Step, number]>([0, 0]);
  const [url, setUrl] = useState("");
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [format, setFormat] = useState<"video" | "audio">("video");
  const [includeAudio, setIncludeAudio] = useState(true);
  const [quality, setQuality] = useState("best");
  const [isLoading, setIsLoading] = useState(false);
  const [processedUrl, setProcessedUrl] = useState("");

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 20 : -20,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 20 : -20,
      opacity: 0,
    }),
  };

  const paginate = (newDirection: number) => {
    const newStep = (step + newDirection) as Step;
    if (newStep >= 0 && newStep <= 2) {
      setStep([newStep, newDirection]);
    }
  };

  // Reset quality when format changes
  useEffect(() => {
    setQuality("best");
  }, [format]);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (error) {
      console.error("Failed to paste:", error);
    }
  };

  const handleFetchVideoInfo = async () => {
    if (!url.trim()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setVideoInfo({
        title: "[พากย์ไทย] ไปต่างโลกก็ต้องไปกับสมาร์ทโฟนสิ ตอนที่ 3【Ani-One Thailand】",
        thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        duration: "15:30",
        channel: "Tech Channel TH",
      });
      paginate(1);
      setIsLoading(false);
    }, 1500);
  };

  const handleProcess = async () => {
    setIsLoading(true);

    // Simulate processing
    setTimeout(() => {
      setProcessedUrl("https://www.example.com/processed-video.mp4");
      paginate(1);
      setIsLoading(false);
    }, 2000);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = processedUrl;
    link.download = videoInfo?.title || "download";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setStep([0, -1]);
    setUrl("");
    setVideoInfo(null);
    setFormat("video");
    setIncludeAudio(true);
    setQuality("best");
    setProcessedUrl("");
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-background to-default-100 py-8 px-4 font-(--font-noto-sans-thai)">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="flex items-center justify-center gap-3">
            <FiDownload size={40} className="text-primary" />
            <h1 className="text-4xl font-bold">YTDownloader</h1>
          </div>
          <p className="text-default-500">
            ดาวน์โหลดวิดีโอและเสียงจาก YouTube ได้ง่ายๆ
          </p>
        </div>

        {/* Main Card */}
        <div className="rounded-large bg-content1 shadow-small flex w-full flex-col gap-4 p-6">
          <LazyMotion features={domAnimation}>
            <m.div layout className="flex min-h-10 items-center gap-2 pb-2">
              {step > 0 && (
                <m.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Tooltip content="ย้อนกลับ" delay={1000}>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="ghost"
                      onPress={() => paginate(-1)}
                    >
                      <FiArrowLeft size={18} />
                    </Button>
                  </Tooltip>
                </m.div>
              )}
              <m.h2
                layout
                className="text-xl font-semibold"
                transition={{ duration: 0.25 }}
              >
                {step === 0 && "ใส่ URL วิดีโอ YouTube"}
                {step === 1 && "เลือกรูปแบบและคุณภาพ"}
                {step === 2 && "พร้อมดาวน์โหลด"}
              </m.h2>
            </m.div>

            <AnimatePresence custom={direction} initial={false} mode="wait">
              {/* Step 0: URL Input */}
              {step === 0 && (
                <m.div
                  key="step-0"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.25 }}
                  className="flex flex-col gap-4"
                >
                  <div className="flex gap-2">
                    <Input
                      type="url"
                      placeholder="วาง URL ของ Youtube ลงที่นี่..."
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      size="lg"
                      variant="bordered"
                      classNames={{
                        input: "text-base",
                        inputWrapper: "h-12",
                      }}
                      startContent={
                        <FaLink size={20} className="mr-1 text-zinc-600" />
                      }
                      endContent={
                        url && (
                          <button
                            onClick={() => setUrl("")}
                            className="text-default-400 hover:text-default-600 transition-colors"
                          >
                            <FiX size={20} />
                          </button>
                        )
                      }
                    />
                    <Tooltip content="วางจากคลิปบอร์ด" delay={1000}>
                      <Button
                        isIconOnly
                        size="lg"
                        variant="bordered"
                        color="primary"
                        onPress={handlePaste}
                      >
                        {/* <FiClipboard size={20} /> */}
                        <FaPaste size={20} />
                      </Button>
                    </Tooltip>
                  </div>

                  <Button
                    color="primary"
                    size="lg"
                    variant="shadow"
                    onPress={handleFetchVideoInfo}
                    isLoading={isLoading}
                    isDisabled={!url.trim()}
                    endContent={!isLoading && <FiArrowRight size={20} />}
                    spinner={<Spinner variant="gradient" size="sm" color="default" />}
                  >
                    {isLoading ? "กำลังตรวจสอบ..." : "ค้นหา"}
                  </Button>
                </m.div>
              )}

              {/* Step 1: Video Info + Format & Quality Options */}
              {step === 1 && videoInfo && (
                <m.div
                  key="step-1"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.25 }}
                  className="flex flex-col gap-6"
                >
                  {/* Video Info Card */}
                  <Card>
                    <CardBody>
                      <div className="flex flex-col md:flex-row gap-4">
                        {/* รูปภาพ */}
                        <div className="w-full md:w-1/3">
                          <div className="aspect-video w-full overflow-hidden rounded-lg">
                            <img
                              src={videoInfo.thumbnail}
                              alt={videoInfo.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        {/* ข้อความ */}
                        <div className="flex flex-col justify-center gap-2 flex-1">
                          <h3 className="font-semibold text-lg line-clamp-2">{videoInfo.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-default-500">
                            <span>{videoInfo.channel}</span>
                            <span>•</span>
                            <span>{videoInfo.duration}</span>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>


                  <Divider />

                  {/* Format Selector */}
                  <FormatSelector
                    format={format}
                    onFormatChange={setFormat}
                    includeAudio={includeAudio}
                    onIncludeAudioChange={setIncludeAudio}
                  />

                  {/* Quality Selector */}
                  <QualitySelector
                    format={format}
                    quality={quality}
                    onQualityChange={setQuality}
                  />

                  <Divider />

                  {/* Process Button */}
                  <Button
                    color="primary"
                    size="lg"
                    variant="shadow"
                    onPress={handleProcess}
                    isLoading={isLoading}
                    endContent={!isLoading && <FiArrowRight size={20} />}
                    spinner={<Spinner variant="gradient" size="sm" color="default" />}
                  >
                    {isLoading ? "กำลังประมวลผล..." : "ประมวลผล"}
                  </Button>
                </m.div>
              )}

              {/* Step 2: Preview & Download */}
              {step === 2 && videoInfo && (
                <m.div
                  key="step-2"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.25 }}
                  className="flex flex-col gap-4"
                >
                  <Card>
                    <CardBody className="gap-4">
                      <div className="flex items-start gap-3">
                        <img
                          src={videoInfo.thumbnail}
                          alt={videoInfo.title}
                          className="w-24 h-16 object-cover rounded shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold truncate">{videoInfo.title}</h3>
                          <p className="text-sm text-default-500">{videoInfo.channel}</p>
                        </div>
                      </div>

                      {format === "video" ? (
                        <video
                          src={processedUrl}
                          controls
                          className="w-full rounded-lg"
                          style={{ maxHeight: "400px" }}
                        >
                          เบราว์เซอร์ของคุณไม่รองรับการเล่นวิดีโอ
                        </video>
                      ) : (
                        <audio src={processedUrl} controls className="w-full">
                          เบราว์เซอร์ของคุณไม่รองรับการเล่นเสียง
                        </audio>
                      )}
                    </CardBody>
                  </Card>

                  <div className="flex flex-row gap-2 w-full">
                    <Button
                      size="lg"
                      variant="faded"
                      isIconOnly
                      onPress={handleReset}
                      className="w-[5%]"
                    >
                      <FaSyncAlt size={16} />
                    </Button>

                    <Button
                      color="primary"
                      size="lg"
                      variant="shadow"
                      className="w-[95%]"
                      onPress={handleDownload}
                      startContent={<FiDownload size={20} />}
                    >
                      ดาวน์โหลด
                    </Button>
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </LazyMotion>
        </div>
      </div>
    </main>
  );
}