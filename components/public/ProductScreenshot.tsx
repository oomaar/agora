import Image from "next/image";
import { PRODUCT_SCREENSHOT } from "@/lib/public/constants";

const { dark, light, width, height, alt } = PRODUCT_SCREENSHOT;

// The screenshot that matches the current theme; the other one is display: none,
// so the browser doesn't load it.
export function ProductScreenshot() {
  return (
    <div className="hidden overflow-hidden rounded-xl border border-ag-border-subtle nav:block">
      <Image
        src={dark}
        alt={alt}
        width={width}
        height={height}
        sizes="50vw"
        className="h-auto w-full light:hidden"
      />
      <Image
        src={light}
        alt={alt}
        width={width}
        height={height}
        sizes="50vw"
        className="hidden h-auto w-full light:block"
      />
    </div>
  );
}
