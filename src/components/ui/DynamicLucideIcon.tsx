"use client";

import React from "react";
import { DynamicIcon, dynamicIconImports } from "lucide-react/dynamic";

type DynamicLucideIconProps = Omit<React.ComponentProps<typeof DynamicIcon>, "name"> & {
    name?: string | null;
    fallbackName?: string;
};

const normalizeIconName = (value: string) =>
    value
        .trim()
        .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
        .replace(/[_\\s]+/g, "-")
        .toLowerCase();

export const DynamicLucideIcon = ({
    name,
    fallbackName = "help-circle",
    ...props
}: DynamicLucideIconProps) => {
    const normalized = name ? normalizeIconName(name) : "";
    const normalizedFallback = normalizeIconName(fallbackName);
    const safeName =
        normalized in dynamicIconImports
            ? normalized
            : normalizedFallback in dynamicIconImports
                ? normalizedFallback
                : "help-circle";

    return <DynamicIcon name={safeName as keyof typeof dynamicIconImports} {...props} />;
};
