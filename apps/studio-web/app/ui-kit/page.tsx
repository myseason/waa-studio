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

const rows = [
  { name: "Page", status: "Draft", updatedAt: "2025-12-19" },
  { name: "Header Composite", status: "Ready", updatedAt: "2025-12-10" },
  { name: "Export Job", status: "Queued", updatedAt: "2025-12-08" },
];

export default function UiKitPage() {
  return (
    <main className="min-h-screen bg-bg text-text">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 p-8">
        <header className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold">UI Kit</h1>
          <p className="text-sm text-muted">Board_6 tokens 기반 공통 컴포넌트 확인</p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Button</CardTitle>
            <CardDescription>primary / secondary / ghost</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button disabled>Disabled</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
            <CardDescription>기본 / disabled</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Input placeholder="Search..." />
            <Input disabled placeholder="Disabled" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Table</CardTitle>
            <CardDescription>border + surface + hover</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell className="font-medium">{row.name}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell className="text-right text-muted">{row.updatedAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

