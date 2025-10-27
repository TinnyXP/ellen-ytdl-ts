"use client";

import { RadioGroup, useRadio, VisuallyHidden, Checkbox, cn } from "@heroui/react";
import { FaFileAudio, FaFileVideo } from "react-icons/fa6";

interface FormatSelectorProps {
  format: "video" | "audio";
  onFormatChange: (format: "video" | "audio") => void;
  includeAudio: boolean;
  onIncludeAudioChange: (include: boolean) => void;
}

const CustomRadio = (props: any) => {
  const {
    Component,
    children,
    description,
    getBaseProps,
    getWrapperProps,
    getInputProps,
    getLabelProps,
    getLabelWrapperProps,
    getControlProps,
  } = useRadio(props);

  return (
    <Component
      {...getBaseProps()}
      className={cn(
        "group inline-flex items-center hover:opacity-70 active:opacity-50 justify-between flex-row-reverse tap-highlight-transparent",
        "flex-1 cursor-pointer border-2 border-default rounded-lg gap-4 p-4",
        "data-[selected=true]:border-primary",
      )}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <span {...getWrapperProps()}>
        <span {...getControlProps()} />
      </span>
      <div {...getLabelWrapperProps()}>
        {children && <span {...getLabelProps()}>{children}</span>}
        {description && (
          <span className="text-small text-foreground opacity-70">{description}</span>
        )}
      </div>
    </Component>
  );
};

export default function FormatSelector({
  format,
  onFormatChange,
  includeAudio,
  onIncludeAudioChange,
}: FormatSelectorProps) {
  return (
    <div className="space-y-2">
      <h1 className="text-default-500 font-semibold">ประเภทไฟล์</h1>
      <RadioGroup
        value={format}
        onValueChange={(value) => onFormatChange(value as "video" | "audio")}
        orientation="horizontal"
        classNames={{
          wrapper: "gap-3",
          label: "text-base font-medium",
        }}
      >
        <CustomRadio value="video">
          <div className="flex items-center gap-2">
            <FaFileVideo size={20} className="text-primary" />
            <span className="font-medium">วิดีโอ</span>
          </div>
        </CustomRadio>
        <CustomRadio value="audio">
          <div className="flex items-center gap-2">
            <FaFileAudio size={20} className="text-brand" />
            <span className="font-medium">เสียง</span>
          </div>
        </CustomRadio>
      </RadioGroup>

      <div className="pt-1">
        {format === "video" && (
          <Checkbox
            isSelected={includeAudio}
            onValueChange={onIncludeAudioChange}
            classNames={{
              label: "text-sm",
            }}
          >
            รวมเสียงในวิดีโอด้วย
          </Checkbox>
        )}
      </div>
    </div>
  );
}