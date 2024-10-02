import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DasboardLayout from "@/layouts/dashboard";
import QrScanner from 'react-qr-scanner';

// Define el tipo para los datos del QR
interface QRData {
  text: string;
}

export default function DashboardAsistencia() {
  const [data, setData] = useState<string>('No result');
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    // Comprobar si el dispositivo es móvil
    setIsMobile(/Mobi|Android/i.test(userAgent));
  }, []);

  const handleScan = (data: QRData | null) => {
    if (data) {
      setData(data.text);
      console.log("QR Data:", data.text);
    }
  };

  const handleError = (err: Error) => {
    console.error(err);
  };

  const previewStyle = {
    height: 240,
    width: 320,
  };

  return (
    <DasboardLayout>
      <div className='flex flex-col md:flex-row md:items-center justify-between'>
        <h2 className='text-xl font-bold mb-8'>Registro de asistencia</h2>
      </div>

      <Tabs defaultValue='qr' className='w-full'>
        <TabsList>
          <TabsTrigger value='qr'>Lector QR</TabsTrigger>
          <TabsTrigger value='manual'>Ingreso Manual</TabsTrigger>
        </TabsList>
        <TabsContent value='qr'>
          <div className='h-[320px] mb-10 flex flex-col justify-center items-center'>
            {isMobile ? (
              <>
                <QrScanner
                  delay={300}
                  onError={handleError}
                  onScan={handleScan}
                  style={previewStyle}
                />
                <div className='text-center mt-4'>
                  <h3>Resultado:</h3>
                  <p>{data}</p>
                </div>
              </>
            ) : (
              <div className='text-center'>
                <h3>Este lector QR solo está disponible en dispositivos móviles.</h3>
                <p>Por favor, utiliza un teléfono o una tablet para escanear el código QR.</p>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value='manual'>
          <div className='h-[530px] mb-10'>Ingreso manual de asistencia</div>
        </TabsContent>
      </Tabs>
    </DasboardLayout>
  );
}
