"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Plus, Save, Trash2, Upload } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useCategoryStore } from "@/store/useCategoryStore";
import {
    detectDelimiter,
    normalizeProductName,
    parsePaste,
    parsePriceTRY,
} from "@/lib/urunler-bulk/utils";
import type {
    AdminUrunlerBulkRequest,
    AdminUrunlerBulkResponse,
    BulkRowErrorCode,
    BulkRowResult,
} from "@/lib/urunler-bulk/types";

type EditableRow = {
    id: string;
    name: string;
    price: string;
    imageUrl: string;
    description: string;
    feature1: string;
    feature2: string;
    feature3: string;
    feature4: string;
    imagePreviewUrl: string;
    imagePreviewFailed: boolean;
};

const MAX_ROWS = 500;
const HEADERS = [
    "Ürün İsmi*",
    "Fiyat*",
    "Görsel URL*",
    "Açıklama",
    "Özellik 1",
    "Özellik 2",
    "Özellik 3",
    "Özellik 4",
] as const;

const ERROR_LABELS: Record<BulkRowErrorCode, string> = {
    REQUIRED_NAME: "Ürün ismi zorunlu.",
    REQUIRED_PRICE: "Fiyat zorunlu.",
    INVALID_PRICE_FORMAT: "Fiyat formatı geçersiz.",
    INVALID_PRICE_RANGE: "Fiyat 0'dan büyük olmalı ve en fazla 2 ondalık içermeli.",
    REQUIRED_IMAGE_URL: "Görsel URL zorunlu.",
    INVALID_IMAGE_URL: "Görsel URL http/https olmalı.",
    DUPLICATE_NAME_IN_BATCH: "Toplu listede mükerrer ürün ismi.",
    DUPLICATE_NAME_IN_DB: "Veritabanında aynı isim zaten var.",
    CATEGORY_REQUIRED: "Kategori seçimi zorunlu.",
    MAX_LENGTH_EXCEEDED: "Maksimum karakter limiti aşıldı.",
    DB_INSERT_FAILED: "Veritabanı kayıt hatası.",
};

function createRow(id: string): EditableRow {
    return {
        id,
        name: "",
        price: "",
        imageUrl: "",
        description: "",
        feature1: "",
        feature2: "",
        feature3: "",
        feature4: "",
        imagePreviewUrl: "",
        imagePreviewFailed: false,
    };
}

function looksLikeHeaderRow(cells: string[]): boolean {
    const first = (cells[0] || "").toLowerCase();
    const second = (cells[1] || "").toLowerCase();
    const third = (cells[2] || "").toLowerCase();

    const headerHints = ["ürün", "urun", "name", "isim", "fiyat", "price", "görsel", "gorsel", "image"];
    const hits = [first, second, third].reduce((acc, text) => {
        return acc + (headerHints.some((hint) => text.includes(hint)) ? 1 : 0);
    }, 0);

    return hits >= 2;
}

function padToEight(cells: string[]): string[] {
    const normalized = cells.slice(0, 8);
    while (normalized.length < 8) normalized.push("");
    return normalized;
}

function isHttpUrl(value: string): boolean {
    if (!value) return false;
    try {
        const url = new URL(value);
        return url.protocol === "http:" || url.protocol === "https:";
    } catch {
        return false;
    }
}

function isFullyEmpty(row: EditableRow): boolean {
    return !row.name.trim() &&
        !row.price.trim() &&
        !row.imageUrl.trim() &&
        !row.description.trim() &&
        !row.feature1.trim() &&
        !row.feature2.trim() &&
        !row.feature3.trim() &&
        !row.feature4.trim();
}

export default function AdminUrunlerPage() {
    const { categories, fetchCategories, loading } = useCategoryStore();
    const [categoryId, setCategoryId] = useState<string>("");
    const [rows, setRows] = useState<EditableRow[]>([createRow("r-1")]);
    const rowIdRef = useRef(1);
    const [pasteOpen, setPasteOpen] = useState(false);
    const [pasteText, setPasteText] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [globalError, setGlobalError] = useState<string>("");
    const [globalSuccess, setGlobalSuccess] = useState<string>("");
    const [serverResultsByIndex, setServerResultsByIndex] = useState<Record<number, BulkRowResult>>({});

    useEffect(() => {
        void fetchCategories();
    }, [fetchCategories]);

    const updateCell = useCallback((rowId: string, field: keyof EditableRow, value: string) => {
        setServerResultsByIndex({});
        setRows((prev) =>
            prev.map((row) => {
                if (row.id !== rowId) return row;
                if (field === "imageUrl") {
                    return { ...row, imageUrl: value, imagePreviewFailed: false };
                }
                return { ...row, [field]: value };
            })
        );
    }, []);

    const removeRow = useCallback((rowId: string) => {
        setServerResultsByIndex({});
        setRows((prev) => {
            if (prev.length === 1) return [createRow(rowId)];
            return prev.filter((row) => row.id !== rowId);
        });
    }, []);

    const addRow = useCallback(() => {
        setServerResultsByIndex({});
        setRows((prev) => {
            if (prev.length >= MAX_ROWS) return prev;
            rowIdRef.current += 1;
            return [...prev, createRow(`r-${rowIdRef.current}`)];
        });
    }, []);

    const validateRows = useMemo(() => {
        const rowErrors = new Map<string, BulkRowErrorCode[]>();
        const nameCount = new Map<string, number>();

        rows.forEach((row) => {
            const normalized = normalizeProductName(row.name);
            if (!normalized) return;
            nameCount.set(normalized, (nameCount.get(normalized) || 0) + 1);
        });

        rows.forEach((row) => {
            if (isFullyEmpty(row)) return;

            const errors: BulkRowErrorCode[] = [];
            const normalizedName = normalizeProductName(row.name);

            if (!row.name.trim()) errors.push("REQUIRED_NAME");
            if (!row.price.trim()) {
                errors.push("REQUIRED_PRICE");
            } else {
                const price = parsePriceTRY(row.price);
                if (!price.ok) errors.push(price.code);
            }

            if (!row.imageUrl.trim()) {
                errors.push("REQUIRED_IMAGE_URL");
            } else if (!isHttpUrl(row.imageUrl)) {
                errors.push("INVALID_IMAGE_URL");
            }

            if (row.name.length > 120 || row.description.length > 1000) {
                errors.push("MAX_LENGTH_EXCEEDED");
            }
            if ([row.feature1, row.feature2, row.feature3, row.feature4].some((f) => f.length > 120)) {
                errors.push("MAX_LENGTH_EXCEEDED");
            }

            if (normalizedName && (nameCount.get(normalizedName) || 0) > 1) {
                errors.push("DUPLICATE_NAME_IN_BATCH");
            }

            if (errors.length > 0) rowErrors.set(row.id, [...new Set(errors)]);
        });

        return rowErrors;
    }, [rows]);

    const hasClientErrors = useMemo(() => {
        for (const [, errors] of validateRows.entries()) {
            if (errors.length > 0) return true;
        }
        return false;
    }, [validateRows]);

    const handleImageBlur = useCallback((rowId: string) => {
        setRows((prev) =>
            prev.map((row) => {
                if (row.id !== rowId) return row;
                const imageUrl = row.imageUrl.trim();
                if (!isHttpUrl(imageUrl)) {
                    return { ...row, imagePreviewUrl: "", imagePreviewFailed: false };
                }
                return { ...row, imagePreviewUrl: imageUrl, imagePreviewFailed: false };
            })
        );
    }, []);

    const handleImageError = useCallback((rowId: string) => {
        setRows((prev) =>
            prev.map((row) => (row.id === rowId ? { ...row, imagePreviewFailed: true } : row))
        );
    }, []);

    const applyPaste = useCallback(() => {
        if (!pasteText.trim()) return;

        const delimiter = detectDelimiter(pasteText);
        // Paste parsing lives here: autodetect delimiter + quoted CSV/TSV parse.
        const parsed = parsePaste(pasteText);
        if (parsed.length === 0) {
            setGlobalError("Yapıştırılan veri boş.");
            return;
        }

        const dataRows = looksLikeHeaderRow(parsed[0]) ? parsed.slice(1) : parsed;
        const incomingRows = dataRows
            .map((cells) => padToEight(cells))
            .filter((cells) => cells.some((cell) => cell.trim().length > 0));

        if (incomingRows.length === 0) {
            setGlobalError("Yapıştırılan veride kayıt bulunamadı.");
            return;
        }

        const availableSlots = MAX_ROWS - rows.length;
        if (availableSlots <= 0) {
            setGlobalError(`Maksimum ${MAX_ROWS} satır sınırına ulaştınız.`);
            return;
        }

        const rowsToAdd = incomingRows.slice(0, availableSlots);
        setServerResultsByIndex({});
        setRows((prev) => {
            const merged = [...prev];
            for (const cells of rowsToAdd) {
                rowIdRef.current += 1;
                merged.push({
                    id: `r-${rowIdRef.current}`,
                    name: cells[0],
                    price: cells[1],
                    imageUrl: cells[2],
                    description: cells[3],
                    feature1: cells[4],
                    feature2: cells[5],
                    feature3: cells[6],
                    feature4: cells[7],
                    imagePreviewUrl: "",
                    imagePreviewFailed: false,
                });
            }
            return merged;
        });

        setGlobalError("");
        if (rowsToAdd.length < incomingRows.length) {
            setGlobalSuccess(
                `${rowsToAdd.length} satır eklendi, ${incomingRows.length - rowsToAdd.length} satır limit nedeniyle atlandı (${delimiter === "\t" ? "TSV" : delimiter === ";" ? "CSV ;" : "CSV ,"}).`
            );
        } else {
            setGlobalSuccess(
                `${rowsToAdd.length} satır eklendi (${delimiter === "\t" ? "TSV" : delimiter === ";" ? "CSV ;" : "CSV ,"}).`
            );
        }
        setPasteOpen(false);
        setPasteText("");
    }, [pasteText, rows.length]);

    const buildPayload = useCallback((): AdminUrunlerBulkRequest => {
        return {
            categoryId,
            rows: rows.map((row, index) => ({
                rowIndex: index + 1,
                name: row.name,
                price: row.price,
                imageUrl: row.imageUrl,
                description: row.description,
                feature1: row.feature1,
                feature2: row.feature2,
                feature3: row.feature3,
                feature4: row.feature4,
            })),
        };
    }, [categoryId, rows]);

    const saveAll = useCallback(async () => {
        setGlobalError("");
        setGlobalSuccess("");
        setServerResultsByIndex({});

        if (!categoryId) {
            setGlobalError("Lütfen kategori seçin.");
            return;
        }

        const nonEmptyRows = rows.filter((row) => !isFullyEmpty(row));
        if (nonEmptyRows.length === 0) {
            setGlobalError("Kaydetmek için en az bir satır girin.");
            return;
        }

        if (rows.length > MAX_ROWS) {
            setGlobalError(`Maksimum ${MAX_ROWS} satır ekleyebilirsiniz.`);
            return;
        }

        if (hasClientErrors) {
            setGlobalError("Kaydetmeden önce kırmızı satırlardaki hataları düzeltin.");
            return;
        }

        setIsSaving(true);
        try {
            const response = await fetch("/api/admin/urunler/bulk", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(buildPayload()),
            });

            if (!response.ok) {
                const body = await response.json().catch(() => null);
                const message = body?.error?.message || "Kayıt sırasında beklenmeyen hata oluştu.";
                setGlobalError(message);
                return;
            }

            const data = (await response.json()) as AdminUrunlerBulkResponse;
            const map: Record<number, BulkRowResult> = {};
            data.results.forEach((result) => {
                map[result.rowIndex] = result;
            });
            setServerResultsByIndex(map);

            const summary = `${data.insertedCount} satır kaydedildi, ${data.failedCount} satır başarısız.`;
            if (data.failedCount > 0) {
                setGlobalError(summary);
            } else {
                setGlobalSuccess(summary);
            }
        } catch {
            setGlobalError("İstek gönderilemedi.");
        } finally {
            setIsSaving(false);
        }
    }, [buildPayload, categoryId, hasClientErrors, rows]);

    return (
        <div className="min-h-screen bg-slate-100 p-6 md:p-8" data-testid="bulk-urunler-page">
            <Card className="mx-auto max-w-[1600px]">
                <CardHeader className="space-y-3">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <CardTitle className="text-slate-900">Toplu Ürün Girişi</CardTitle>
                            <CardDescription>
                                Excel/CSV/TSV satırlarını tabloya yapıştırıp tek seferde kaydedin.
                            </CardDescription>
                        </div>
                        <Button variant="outline" asChild>
                            <Link href="/admin">Panele Dön</Link>
                        </Button>
                    </div>
                    <div className="grid gap-3 md:grid-cols-[420px_1fr] md:items-end">
                        <div className="space-y-2">
                            <Label>Kategori *</Label>
                            <Select
                                value={categoryId}
                                onValueChange={(value) => {
                                    setCategoryId(value);
                                    setServerResultsByIndex({});
                                }}
                            >
                                <SelectTrigger data-testid="category-select">
                                    <SelectValue
                                        placeholder={
                                            loading ? "Kategoriler yükleniyor..." : "Kategori seçin"
                                        }
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category.id} value={category.id} data-testid="category-option">
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={addRow}
                                disabled={rows.length >= MAX_ROWS}
                                data-testid="add-row-button"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                + Satır Ekle
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setPasteOpen(true)}
                                data-testid="open-paste-dialog-button"
                            >
                                <Upload className="mr-2 h-4 w-4" />
                                Excel/CSV Yapıştır
                            </Button>
                            <Button type="button" onClick={saveAll} disabled={isSaving} data-testid="bulk-save-button">
                                <Save className="mr-2 h-4 w-4" />
                                {isSaving ? "Kaydediliyor..." : "Toplu Kaydet"}
                            </Button>
                            <Badge variant="outline">{rows.length}/{MAX_ROWS} satır</Badge>
                        </div>
                    </div>
                    {globalError && (
                        <div
                            className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700"
                            data-testid="bulk-global-error"
                        >
                            {globalError}
                        </div>
                    )}
                    {globalSuccess && (
                        <div
                            className="rounded-md border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
                            data-testid="bulk-global-success"
                        >
                            {globalSuccess}
                        </div>
                    )}
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="overflow-x-auto rounded-md border bg-white">
                        <Table className="min-w-[1450px]">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[72px]">#</TableHead>
                                    {HEADERS.map((header) => (
                                        <TableHead key={header}>{header}</TableHead>
                                    ))}
                                    <TableHead className="w-[220px]">Durum</TableHead>
                                    <TableHead className="w-[72px]">Sil</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {rows.map((row, index) => {
                                    const clientErrors = validateRows.get(row.id) || [];
                                    const serverResult = serverResultsByIndex[index + 1];
                                    const rowHasError =
                                        clientErrors.length > 0 ||
                                        (serverResult?.status === "failed" && serverResult.errors.length > 0);
                                    const rowIsInserted = serverResult?.status === "inserted";
                                    const rowErrorMessages = [...new Set([
                                        ...clientErrors.map((code) => ERROR_LABELS[code]),
                                        ...((serverResult?.errors || []).map((code) => ERROR_LABELS[code])),
                                    ])];

                                    return (
                                        <TableRow
                                            key={row.id}
                                            data-testid={`bulk-row-${index + 1}`}
                                            className={rowHasError ? "bg-red-50/60" : rowIsInserted ? "bg-emerald-50/50" : ""}
                                        >
                                            <TableCell className="text-xs font-medium text-slate-500">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell>
                                                <Input
                                                    value={row.name}
                                                    onChange={(e) => updateCell(row.id, "name", e.target.value)}
                                                    className={clientErrors.includes("REQUIRED_NAME") ? "border-red-400" : ""}
                                                    data-testid={`row-${index + 1}-name`}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Input
                                                    value={row.price}
                                                    onChange={(e) => updateCell(row.id, "price", e.target.value)}
                                                    className={
                                                        clientErrors.includes("REQUIRED_PRICE") ||
                                                        clientErrors.includes("INVALID_PRICE_FORMAT") ||
                                                        clientErrors.includes("INVALID_PRICE_RANGE")
                                                            ? "border-red-400"
                                                            : ""
                                                    }
                                                    placeholder="Örn: ₺350,50"
                                                    data-testid={`row-${index + 1}-price`}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <div className="space-y-2">
                                                    <Input
                                                        value={row.imageUrl}
                                                        onChange={(e) => updateCell(row.id, "imageUrl", e.target.value)}
                                                        onBlur={() => handleImageBlur(row.id)}
                                                        className={
                                                            clientErrors.includes("REQUIRED_IMAGE_URL") ||
                                                            clientErrors.includes("INVALID_IMAGE_URL")
                                                                ? "border-red-400"
                                                                : ""
                                                        }
                                                        data-testid={`row-${index + 1}-image`}
                                                    />
                                                    {row.imagePreviewUrl && (
                                                        <div className="flex items-center gap-2">
                                                            <img
                                                                src={row.imagePreviewUrl}
                                                                alt="Önizleme"
                                                                className="h-10 w-10 rounded border object-cover"
                                                                onError={() => handleImageError(row.id)}
                                                            />
                                                            {row.imagePreviewFailed && (
                                                                <span className="text-xs text-amber-600">
                                                                    Görsel yüklenemedi (kaydı engellemez).
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Input
                                                    value={row.description}
                                                    onChange={(e) => updateCell(row.id, "description", e.target.value)}
                                                    className={clientErrors.includes("MAX_LENGTH_EXCEEDED") ? "border-red-400" : ""}
                                                    data-testid={`row-${index + 1}-description`}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Input
                                                    value={row.feature1}
                                                    onChange={(e) => updateCell(row.id, "feature1", e.target.value)}
                                                    className={clientErrors.includes("MAX_LENGTH_EXCEEDED") ? "border-red-400" : ""}
                                                    data-testid={`row-${index + 1}-feature1`}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Input
                                                    value={row.feature2}
                                                    onChange={(e) => updateCell(row.id, "feature2", e.target.value)}
                                                    className={clientErrors.includes("MAX_LENGTH_EXCEEDED") ? "border-red-400" : ""}
                                                    data-testid={`row-${index + 1}-feature2`}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Input
                                                    value={row.feature3}
                                                    onChange={(e) => updateCell(row.id, "feature3", e.target.value)}
                                                    className={clientErrors.includes("MAX_LENGTH_EXCEEDED") ? "border-red-400" : ""}
                                                    data-testid={`row-${index + 1}-feature3`}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Input
                                                    value={row.feature4}
                                                    onChange={(e) => updateCell(row.id, "feature4", e.target.value)}
                                                    className={clientErrors.includes("MAX_LENGTH_EXCEEDED") ? "border-red-400" : ""}
                                                    data-testid={`row-${index + 1}-feature4`}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col gap-2">
                                                    {rowIsInserted && (
                                                        <Badge
                                                            variant="outline"
                                                            className="w-fit border-emerald-300 text-emerald-700"
                                                            data-testid={`row-${index + 1}-status-inserted`}
                                                        >
                                                            <CheckCircle2 className="mr-1 h-3 w-3" />
                                                            Kaydedildi
                                                        </Badge>
                                                    )}
                                                    {rowHasError && (
                                                        <Badge
                                                            variant="outline"
                                                            className="w-fit border-red-300 text-red-700"
                                                            title={rowErrorMessages.join("\n")}
                                                            data-testid={`row-${index + 1}-status-error`}
                                                        >
                                                            <AlertCircle className="mr-1 h-3 w-3" />
                                                            Hata ({rowErrorMessages.length})
                                                        </Badge>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => removeRow(row.id)}
                                                    data-testid={`row-${index + 1}-delete`}
                                                >
                                                    <Trash2 className="h-4 w-4 text-red-600" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            <Dialog open={pasteOpen} onOpenChange={setPasteOpen}>
                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>Excel / CSV / TSV Yapıştır</DialogTitle>
                        <DialogDescription>
                            Kolon sırası: isim, fiyat, görsel URL, açıklama, özellik1..4
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-2">
                        <Label htmlFor="paste-data">Veri</Label>
                        <Textarea
                            id="paste-data"
                            value={pasteText}
                            onChange={(e) => setPasteText(e.target.value)}
                            placeholder="Excel'den satırları buraya yapıştırın"
                            className="min-h-[220px]"
                            data-testid="paste-textarea"
                        />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setPasteOpen(false)}>
                            Vazgeç
                        </Button>
                        <Button type="button" onClick={applyPaste} data-testid="paste-apply-button">
                            Tabloya Ekle
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
