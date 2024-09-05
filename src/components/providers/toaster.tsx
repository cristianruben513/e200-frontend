import { Toaster } from "sonner";

export const ToasterComponent = () => {
  return (
    <Toaster
      position="bottom-right"
      theme={"light"}
      toastOptions={{
        classNames: {
          toast: "font-sans bg-[#f3f4f6] text-[#1f2937]",
          description: "font-mono",
        },
      }}
    />
  );
};
