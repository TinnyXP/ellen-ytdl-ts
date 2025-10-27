"use client";

import { Slider } from "@heroui/react";

interface QualitySelectorProps {
  format: "video" | "audio";
  quality: string;
  onQualityChange: (quality: string) => void;
}

const videoQualities = [
  { key: "480", label: "480p" },
  { key: "720", label: "720p" },
  { key: "1080", label: "1080p" },
  { key: "1440", label: "1440p" },
  { key: "2160", label: "2160p" },
];

const audioQualities = [
  { key: "low", label: "64 kbps" },
  { key: "medium", label: "128 kbps" },
  { key: "high", label: "192 kbps" },
  { key: "best", label: "320 kbps" },
];

export default function QualitySelector({
  format,
  quality,
  onQualityChange,
}: QualitySelectorProps) {
  const qualities = format === "video" ? videoQualities : audioQualities;

  const currentIndex = qualities.findIndex((q) => q.key === quality);
  const value = currentIndex >= 0 ? currentIndex : qualities.length - 1;

  const handleChange = (val: number | number[]) => {
    const index = Array.isArray(val) ? val[0] : val;
    onQualityChange(qualities[index].key);
  };

  // ✅ JSX label + cast array ทีเดียว
  const marks = qualities.map((q, index) => {
    const [num, unit] = q.label.split(" ");
    return {
      value: index,
      label: (
        <div className="text-center">
          <div className="text-sm/2 font-medium pt-1">
            <p>{num}</p> <br/>
            {unit && <p className="text-xs/2">{unit}</p>}
          </div>
          {/* {unit && <div className="text-xs text-default-400">{unit}</div>} */}
        </div>
      ),
    };
  }) as unknown as any;

  return (
    <div className="w-full space-y-2">
      <h1 className="text-default-500 font-semibold">คุณภาพไฟล์</h1>
      <div className="px-3">
        <Slider
          color="primary"
          size="md"
          step={1}
          marks={marks}
          value={value}
          onChange={handleChange}
          maxValue={qualities.length - 1}
          minValue={0}
          showSteps
          classNames={{
            base: "max-w-full",
            label: "text-sm font-medium mb-50",
          }}
          getValue={(value) => {
            const index = Array.isArray(value) ? value[0] : value;
            return qualities[index]?.label || "";
          }}
        />
      </div>
    </div>
  );
}
