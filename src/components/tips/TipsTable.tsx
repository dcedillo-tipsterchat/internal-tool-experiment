import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ArrowUpRight
} from "lucide-react"
import Link from "next/link"
import { cookies } from 'next/headers';
import { decryptToken } from '@/lib/crypto';

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getTips() {
    await delay(0);

    const encryptedAuthToken = cookies().get('access_token')?.value;

    if (!encryptedAuthToken) {
        console.error('No access token found');
        return [];
    }

    const authToken = decryptToken(encryptedAuthToken);

    const res = await fetch(`${process.env.API_BASE_PATH}/tips?limit=10`, {
        headers: {
            'Authorization': `Bearer ${authToken}`
        },
        next: { revalidate: 10 },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch tips: ${res.status} ${res.statusText}`)
    }

    const data = await res.json();

    return data.tips.slice(-10);
}

export const TipsTable = async () => {
    const tips = await getTips()

    console.log(tips)

    return (
        <Card
            className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
        >
            <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                    <CardTitle>Últimos Tips</CardTitle>
                    <CardDescription>
                        Los últimos tips publicados.
                    </CardDescription>
                </div>
                <Button asChild size="sm" className="ml-auto gap-1">
                    <Link href="#">
                        Ver todos
                        <ArrowUpRight className="h-4 w-4" />
                    </Link>
                </Button>
            </CardHeader>

            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead></TableHead>
                            <TableHead>
                                Type
                            </TableHead>
                            <TableHead>
                                Stake
                            </TableHead>
                            <TableHead>
                                Bookie
                            </TableHead>
                            <TableHead>
                                Fecha
                            </TableHead>
                            <TableHead className="text-right">
                                Cuota
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tips.map((tip: any) => (
                            <TableRow key={tip.id}>
                                <TableCell>
                                    <div className="font-medium">{tip.tipster.name}</div>
                                    {tip.match_forecasts.map((forecast: any) => (
                                        <div key={forecast.id} className="text-sm text-muted-foreground">
                                            {forecast.pick}
                                        </div>
                                    ))}
                                </TableCell>
                                <TableCell>
                                    {tip.match_forecasts.map((forecast: any) => (
                                        <div key={forecast.id}>{forecast.rate}</div>
                                    ))}
                                </TableCell>
                                <TableCell>
                                    <Badge className="text-xs" variant="outline">
                                        {tip.stake}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {tip.bookie}
                                </TableCell>
                                <TableCell>
                                    {new Date(tip.created_at).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="text-right">{tip.rate}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </CardContent>
        </Card>
    )
}