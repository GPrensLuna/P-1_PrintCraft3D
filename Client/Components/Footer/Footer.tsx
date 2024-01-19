import Image from 'next/image';
import facebook from '@/svg/facebook.svg';
import twitter from '@/svg/twitter.svg';
import instagram from '@/svg/instagram.svg';
import Logo_PrintCraft3D from '@/img/Logo_PrintCraft3D.webp';

export const Footer = () => {
  return (
    <footer className="mt-5 pt-4 pb-4 bg-sky-700 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-xl font-semibold mb-2">Contacto:</h4>
            <ul className="list-none p-0">
              <li>Teléfono:</li>
              <li>Email:</li>
              <li>Ubicación:</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-2">Redes Sociales:</h4>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Image src={facebook} alt="Facebook" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Image src={twitter} alt="Twitter" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Image src={instagram} alt="Instagram" />
              </a>
            </div>
          </div>
        </div>
        <p className="mt-4 flex items-center justify-center">
          <Image src={Logo_PrintCraft3D} alt="Logo de PrintCraft3D" width={30} height={30} />
          &copy;{new Date().getFullYear()} PrintCraft3D - Todos los Derechos Reservados.
        </p>
      </div>
    </footer>
  );
};
