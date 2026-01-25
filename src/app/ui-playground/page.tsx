"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export default function UIPlaygroundPage() {
    const { toast } = useToast();
    const [loading, setLoading] = React.useState(false);

    return (
        <main className="container py-6">
            <header className="mb-6 space-y-2">
                <p className="text-xs tracking-widest text-muted-foreground">UI / PROTOKOL KİTİ</p>
                <h1 className="text-2xl font-semibold">Bileşen Vitrini</h1>
                <p className="text-sm text-muted-foreground">
                    Mobile-first. Klavye ile gez: TAB → focus ring net görünmeli.
                </p>
            </header>

            <section className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg border bg-card p-4">
                    <h2 className="mb-3 text-sm font-medium">BUTTON</h2>
                    <div className="flex flex-wrap gap-2">
                        <Button>PRIMARY</Button>
                        <Button variant="secondary">SECONDARY</Button>
                        <Button variant="outline">OUTLINE</Button>
                        <Button variant="ghost">GHOST</Button>
                        <Button variant="destructive">DESTRUCT</Button>
                        <Button disabled>DISABLED</Button>
                    </div>
                </div>

                <div className="rounded-lg border bg-card p-4">
                    <h2 className="mb-3 text-sm font-medium">INPUT</h2>
                    <div className="space-y-2">
                        <Input placeholder="E-POSTA / KAYIT" aria-label="E-posta" />
                        <Input placeholder="TELEFON" aria-label="Telefon" />
                    </div>
                </div>

                <div className="rounded-lg border bg-card p-4">
                    <h2 className="mb-3 text-sm font-medium">MODAL (DIALOG)</h2>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">KAYDI AÇ</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>KAYIT PENCERESİ</DialogTitle>
                                <DialogDescription>ESC ile kapat. TAB ile dolaş.</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-2">
                                <Input placeholder="KOD" aria-label="Kod" />
                                <div className="flex justify-end gap-2">
                                    <Button variant="secondary">İPTAL</Button>
                                    <Button>ONAY</Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="rounded-lg border bg-card p-4">
                    <h2 className="mb-3 text-sm font-medium">TOAST</h2>
                    <div className="flex flex-wrap gap-2">
                        <Button
                            variant="outline"
                            onClick={() =>
                                toast({
                                    title: "KAYIT OLUŞTURULDU",
                                    description: "Sistem bildirimi."
                                })
                            }
                        >
                            BİLDİRİM GÖSTER
                        </Button>

                        <Button
                            onClick={() => {
                                setLoading(true);
                                setTimeout(() => setLoading(false), 1200);
                            }}
                        >
                            LOADING DEMO
                        </Button>
                    </div>

                    <div className="mt-4">
                        {loading ? (
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-2/3" />
                                <Skeleton className="h-4 w-1/2" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">Bekleme durumunda skeleton görünür.</p>
                        )}
                    </div>
                </div>

                <div className="rounded-lg border bg-card p-4 md:col-span-2">
                    <h2 className="mb-3 text-sm font-medium">TABLE</h2>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>KOD</TableHead>
                                    <TableHead>AD</TableHead>
                                    <TableHead className="text-right">DURUM</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="font-mono">VRL-001</TableCell>
                                    <TableCell>Metal Poster</TableCell>
                                    <TableCell className="text-right">AKTİF</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-mono">VRL-002</TableCell>
                                    <TableCell>Metal Etiket</TableCell>
                                    <TableCell className="text-right">TASLAK</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </section>
        </main>
    );
}
