import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { DownloadIcon, QrCodeIcon } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useRef } from 'react';

export default function ShowQR({ qrValue }: { qrValue: string }) {
	// Crear una referencia para el contenedor del QR
	const qrRef = useRef<SVGSVGElement | null>(null);

	// Función para descargar el QR como imagen PNG
	const handleDownload = () => {
		if (qrRef.current) {
			const svg = qrRef.current;
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');

			const svgData = new XMLSerializer().serializeToString(svg);
			const img = new Image();
			const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
			const url = URL.createObjectURL(svgBlob);

			img.onload = () => {
				canvas.width = img.width;
				canvas.height = img.height;
				if (ctx) {
					ctx.drawImage(img, 0, 0);
					const pngFile = canvas.toDataURL('image/png');

					// Crear enlace de descarga
					const downloadLink = document.createElement('a');
					downloadLink.href = pngFile;
					downloadLink.download = 'qr-code.png';
					downloadLink.click();
					URL.revokeObjectURL(url);
				}
			};
			img.src = url;
		}
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="outline">
					<span className="md:block hidden">Mostrar QR</span>
					<QrCodeIcon className="size-4 ml-2" />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Enlace para registro</AlertDialogTitle>
					<AlertDialogDescription>
						Registrate a través de WhatsApp escaneando el código QR
					</AlertDialogDescription>
				</AlertDialogHeader>
				<div className="flex justify-center items-center my-6">
					<div className="p-4 rounded-xl bg-neutral-200">
						<QRCodeSVG value={qrValue} size={230} ref={qrRef} marginSize={4} />
					</div>
				</div>
				<AlertDialogFooter>
					<AlertDialogCancel>Cerrar</AlertDialogCancel>
					<AlertDialogAction onClick={handleDownload}>
						Descargar QR
						<DownloadIcon className="size-4 ml-2" />
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
