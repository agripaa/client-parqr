"use client";
import * as React from 'react';
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import { siteConfig } from "@/config/site";
import ParqrLogo from "@/assets/LOGO PARQR.png";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { ArrowDrop, History, Logo, Logout, UserSetting } from "@/components/icons";
import Image from "next/image";
import ProfilePicture from "@/assets/profile.png";
import ActivityModal from './modal/ActivityModal';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { getProfileUser } from '@/services/api';
import { IUserProfile } from '@/interface/userInterface';

export const Navbar = () => {
  const nameParams = usePathname();
  const isActive = (href: string) => href === nameParams;
  const token = Cookies.get('token');
  const router = useRouter();

  const [isDropdownOpen, setIsDropdownOpen] = React.useState<boolean>(false);
  const [ActivityDropDown, setActivityDropDown] = React.useState<boolean>(false);
  const [dataUser, setDataUser] = React.useState<IUserProfile>();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setIsDropdownOpen(false);
  const openActivityDropDown = () => setActivityDropDown(true);
  const closeActivityModal = () => setActivityDropDown(false);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (event.target instanceof Element && !event.target.closest('.profile-dropdown')) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getProfile = async () => {
    try {
      const response = await getProfileUser(token as string, router);
      setDataUser(response);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getProfile();
  }, []);

  const handleLogOut = () => {
    Cookies.remove('token');
    router.push('/');
  };

  return (
    <>
      <NextUINavbar maxWidth="xl" position="sticky" className="flex drop-shadow bg-neutral-50">
        <NavbarContent className="flex basis-1/3 sm:basis-full w-full justify-between" justify="start">
          <NavbarContent justify="start">
            <NavbarBrand as="li" className="gap-2 max-w-fit">
              <NextLink className="flex justify-start items-center gap-2" href="/kamera">
                <Logo 
                  src={ParqrLogo} 
                  width={22}
                  height={32}
                />
                <p className="font-bold leading-12 text-2xl ml-[5px]">ParQR</p>
              </NextLink>
            </NavbarBrand>
          </NavbarContent>
          <NavbarContent justify="center">
            <ul className="hidden lg:flex gap-2 justify-start ml-5">
              {siteConfig.navItems.map((item) => (
                <NavbarItem key={item.href} className="text-blue-500">
                  <NextLink
                    href={item.href}
                    className={`p-2`}
                  >
                    <p className={`p-2 px-4 ${isActive(item.href) ? 'bg-blue-100 w-full bg-opacity-50 rounded-lg' : ''}`}>{item.label}</p>
                  </NextLink>
                </NavbarItem>
              ))}
            </ul>
          </NavbarContent>
          <NavbarContent justify="end">
            <div className="relative flex items-center group profile-dropdown">
              <div className="flex flex-col text-sm mr-3">
                <p className="font-semibold text-neutral-900">{dataUser?.username}</p> 
                <p className="font-normal text-neutral-600">{dataUser?.role_id['role'] === "owner" ? "Hello Owner!" : dataUser?.NIK || "NIK isn't input!"}</p>
              </div>
              <div className="flex items-center cursor-pointer" onClick={toggleDropdown}>
                {dataUser?.image_profile['image_url'] ? (
                  <Image
                    src={`http://localhost:3001/${dataUser.image_profile['image_url']}`} 
                    alt="Profile"
                    width={50} 
                    height={50} 
                    className="rounded-full"
                  />
                ) : (
                  <Image
                    src={ProfilePicture} 
                    alt="Default Profile"
                    width={50} 
                    height={50} 
                    className="rounded-full"
                  />
                )}
                <ArrowDrop size={25} className="ml-1" />
              </div>
              {isDropdownOpen && (
                <div className="absolute top-full left-0 bg-white text-start p-2 shadow-md text-sm rounded-md mt-1 w-[190px] z-10">
                  {dataUser?.role_id['role'] === "owner" ?(
                    <>
                      <div className="flex flex-row p-2 items-center font-medium hover:bg-gray-100 w-full cursor-pointer">
                        <UserSetting size={20} className="mr-3" />
                        <a href="/owner/operator-list">Kelola Operator</a>
                      </div>
                      <div className="flex flex-row p-2 items-center font-medium hover:bg-gray-100 cursor-pointer" onClick={openActivityDropDown}>
                        <History size={20} className="mr-3" />
                        <div>Aktivitas</div>
                      </div>
                    </>
                  ) : ""
                  }
                  <div className="flex flex-row p-2 items-center font-medium hover:bg-gray-100 cursor-pointer text-danger" onClick={handleLogOut}>
                    <Logout size={20} className="mr-3" />
                    <a>Logout</a>
                  </div>
                </div>
              )}
            </div>
          </NavbarContent>
        </NavbarContent>
      </NextUINavbar>

      <ActivityModal isOpen={ActivityDropDown} onClose={closeActivityModal} />
    </>
  );
};
