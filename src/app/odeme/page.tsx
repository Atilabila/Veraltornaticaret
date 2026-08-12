import { redirect } from "next/navigation";
import { CART_ENABLED } from "@/lib/commerce";

export default function OdemePage() {
  if (!CART_ENABLED) redirect("/teklif-al");
  redirect("/teklif-al");
}
