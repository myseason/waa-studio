"use client";

import { useEffect, useMemo, useState } from "react";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@waa/ui";

type ProjectRow = {
  id: string;
  name: string;
  status: "Draft" | "Ready" | "Queued";
  updatedAt: string;
};

function DialogDemo() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    
    <Card>
      <CardHeader>
        <CardTitle>Dialog</CardTitle>
        <CardDescription>“Open dialog” 버튼으로 열기/닫기 확인</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-2">
        <Button variant="secondary" onClick={() => setOpen(true)}>
          Open dialog
        </Button>
        <span className="text-sm text-muted">상태: {open ? "open" : "closed"}</span>
        <div className="mt-4 h-8 w-40 rounded-sm bg-primary" />
      </CardContent>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close dialog"
            className="absolute inset-0 bg-bg/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-md rounded-md border border-border bg-surface text-text shadow-soft"
          >
            <div className="border-b border-border p-4">
              <div className="text-sm font-semibold">Sample dialog</div>
              <div className="mt-1 text-sm text-muted">tokens 기반 surface/border/shadow 확인</div>
            </div>
            <div className="p-4 text-sm">
              <p className="text-text">Dialog content 영역입니다.</p>
              <p className="mt-2 font-mono text-xs text-muted">
                {"<Dialog />"} (demo)
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 border-t border-border p-4">
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Confirm</Button>
            </div>
          </div>
        </div>
      ) : null}
    </Card>
  );
}

export default function DevUiPage() {
  const rows = useMemo<ProjectRow[]>(
    () => [
      { id: "p1", name: "Landing Page", status: "Draft", updatedAt: "2025-12-19" },
      { id: "p2", name: "Header Composite", status: "Ready", updatedAt: "2025-12-10" },
      { id: "p3", name: "Export Pipeline", status: "Queued", updatedAt: "2025-12-08" },
    ],
    [],
  );

  return (
    <main className="min-h-screen bg-bg text-text">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-8">
        <header className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold">WAA Studio UI Kit (Board_6)</h1>
          <p className="text-sm text-muted">tokens/base + @waa/ui 컴포넌트 빠른 검증용 페이지</p>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Typography</CardTitle>
                <CardDescription>h1 / h2 / body / mono</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <div className="text-2xl font-semibold tracking-tight">Heading 1</div>
                <div className="text-lg font-semibold tracking-tight">Heading 2</div>
                <div className="text-sm text-text">
                  Body text 예시. <span className="text-muted">muted text</span> 예시 포함.
                </div>
                <div className="rounded-md border border-border bg-surface-2 p-3 font-mono text-xs text-text">
                  {`const tokens = "board_6";`}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Buttons</CardTitle>
                <CardDescription>primary / secondary / ghost / disabled + small/default</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <div className="flex flex-wrap gap-2">
                  <Button size="sm">Primary (sm)</Button>
                  <Button>Primary</Button>
                  <Button disabled>Disabled</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="secondary" size="sm">
                    Secondary (sm)
                  </Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="ghost">Ghost</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Inputs</CardTitle>
                <CardDescription>default / disabled + help text</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <Input placeholder="Search projects..." />
                  <div className="text-xs text-muted">help: 토큰 기반 placeholder / focus ring 확인</div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Input disabled placeholder="Disabled" />
                  <div className="text-xs text-muted">help: disabled bg/surface-2 확인</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Card</CardTitle>
                <CardDescription>title / description / content</CardDescription>
              </CardHeader>
              <CardContent>
                <Card className="bg-surface-2">
                  <CardHeader>
                    <CardTitle>Nested card</CardTitle>
                    <CardDescription>surface-2 배경으로 대비 확인</CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm text-text">
                    CardContent 예시. border, radius, shadow-soft가 tokens 기반으로 동작해야 합니다.
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Table</CardTitle>
            <CardDescription>3행 프로젝트 목록</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="font-medium">{row.name}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell className="text-right text-muted">{row.updatedAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <DialogDemo />
      </div>
    </main>
  );
}

