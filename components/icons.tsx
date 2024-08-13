import * as React from "react";
import { ILogoPng } from "@/interface";
import Image from "next/image";
import { IconSvgProps } from "@/types";

export const Logo: React.FunctionComponent<ILogoPng> = ({
	src,
	size,
	width,
	height,
	className
}) => (
	<Image
		src={src}
		alt="Logo ParQR"
		className={className}
		height={size || height}
		width={size || width}
	/>
);

export const MapPin : React.FC<IconSvgProps> = ({
	size = 22.5,
	width,
	height,
	color,
	className,
	...props
}) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg" 
			viewBox="0 0 24 24" 
			fill="currentColor"
			color={color}
			width={size || width}
			height={size || height}
			className={className}
			{...props}
			>
			<path d="M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364ZM12 15C14.2091 15 16 13.2091 16 11C16 8.79086 14.2091 7 12 7C9.79086 7 8 8.79086 8 11C8 13.2091 9.79086 15 12 15ZM12 13C10.8954 13 10 12.1046 10 11C10 9.89543 10.8954 9 12 9C13.1046 9 14 9.89543 14 11C14 12.1046 13.1046 13 12 13Z">
			</path>
		</svg>
	)
}

export const Time: React.FC<IconSvgProps> = ({
	size = 22.5,
	width,
	height,
	color,
	className,
	...props
}) => {
	return(
		<svg 
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24" 
			fill="currentColor"
			color={color}
			width={size || width}
			height={size || height}
			className={className}
			{...props}
			>
			<path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM13 12V7H11V14H17V12H13Z">
			</path>
		</svg>
	)
}

export const ArrowRight: React.FC<IconSvgProps> = ({
	size,
	width,
	height,
	color,
	className,
	...props
}) => {
	return(
		<svg 
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24" 
			fill="currentColor"
			color={color}
			width={size || width}
			height={size || height}
			className={className}
			{...props}
			>
			<path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
		</svg>
	)
}

export const ArrowLeft: React.FC<IconSvgProps> = ({
	size,
	width,
	height,
	color,
	className,
	...props
}) => {
	return(
		<svg 
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24" 
			fill="currentColor"
			color={color}
			width={size || width}
			height={size || height}
			className={className}
			{...props}
			>
			<path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path>
		</svg>
	)
}

export const MotorCycleIcon: React.FC<IconSvgProps> = ({
	size,
	width,
	height,
	color,
	className,
	...props
}) => {
	return(
		<svg 
			color={color}
			width={size || width}
			height={size || height}
			className={className}
			{...props}
			xmlns="http://www.w3.org/2000/svg" 
			viewBox="0 0 24 24" 
			fill="currentColor">
			<path d="M8.36547 10L11.2 8H14.6915L13.5996 5H11V3H15L16.0919 6H20V9H17.1838L18.6405 13.0022C21.0608 13.0764 23 15.0617 23 17.5C23 19.9853 20.9853 22 18.5 22C16.0147 22 14 19.9853 14 17.5C14 15.6722 15.0897 14.0989 16.6549 13.3944L15.4194 10H14.4718L12.89 15.87L9.96536 16.9389C9.98822 17.1227 10 17.31 10 17.5C10 19.9853 7.98528 22 5.5 22C3.01472 22 1 19.9853 1 17.5C1 15.5407 2.25221 13.8738 4 13.2561V12H2V10H8.36547ZM5.5 20C6.88071 20 8 18.8807 8 17.5C8 16.1193 6.88071 15 5.5 15C4.11929 15 3 16.1193 3 17.5C3 18.8807 4.11929 20 5.5 20ZM18.5 20C19.8807 20 21 18.8807 21 17.5C21 16.1193 19.8807 15 18.5 15C17.1193 15 16 16.1193 16 17.5C16 18.8807 17.1193 20 18.5 20Z"></path>
		</svg>
	)
}

export const CarIcon: React.FC<IconSvgProps> = ({
	size,
	width,
	height,
	color,
	className,
	...props
}) => {
	return(
		<svg 
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24" 
			fill="currentColor"
			color={color}
			width={size || width}
			height={size || height}
			className={className}
			{...props}
			>
			<path
				d="M19 20H5V21C5 21.5523 4.55228 22 4 22H3C2.44772 22 2 21.5523 2 21V12L4.51334 5.29775C4.80607 4.51715 5.55231 4 6.386 4H17.614C18.4477 4 19.1939 4.51715 19.4867 5.29775L22 12V21C22 21.5523 21.5523 22 21 22H20C19.4477 22 19 21.5523 19 21V20ZM4.136 12H19.864L17.614 6H6.386L4.136 12ZM6.5 17C7.32843 17 8 16.3284 8 15.5C8 14.6716 7.32843 14 6.5 14C5.67157 14 5 14.6716 5 15.5C5 16.3284 5.67157 17 6.5 17ZM17.5 17C18.3284 17 19 16.3284 19 15.5C19 14.6716 18.3284 14 17.5 14C16.6716 14 16 14.6716 16 15.5C16 16.3284 16.6716 17 17.5 17Z">
			</path>
		</svg>
	)
}

export const TruckIcon: React.FC<IconSvgProps> = ({
	size,
	width,
	height,
	color,
	className,
	...props
}) => {
	return(
		<svg 
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24" 
			fill="currentColor"
			color={color}
			width={size || width}
			height={size || height}
			className={className}
			{...props}
			>
				<path
					d="M17 8H20L23 12.0557V18H20.9646C20.7219 19.6961 19.2632 21 17.5 21C15.7368 21 14.2781 19.6961 14.0354 18H8.96456C8.72194 19.6961 7.26324 21 5.5 21C3.73676 21 2.27806 19.6961 2.03544 18H1V6C1 5.44772 1.44772 5 2 5H16C16.5523 5 17 5.44772 17 6V8ZM17 10V13H21V12.715L18.9917 10H17Z">
				</path>
		</svg>
	)
}

export const CheckboxIcon: React.FC<IconSvgProps> = ({
	size,
	width,
	height,
	color,
	className,
	...props
}) => {
	return(
		<svg 
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24" 
			fill="currentColor"
			color={color}
			width={size || width}
			height={size || height}
			className={className}
			{...props}
			>
				<path
					d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z">
				</path>
		</svg>
	)
}

export const ArrowDrop: React.FC<IconSvgProps> = ({
	size,
	width,
	height,
	color,
	className,
	...props
}) => {
	return(
		<svg 
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24" 
			fill="currentColor"
			color={color}
			width={size || width}
			height={size || height}
			className={className}
			{...props}
			>
				<path d="M12 14L8 10H16L12 14Z"></path>
		</svg>
	)
}

export const PencilLine: React.FC<IconSvgProps> = ({
	size,
	width,
	height,
	color,
	className,
	...props
}) => {
	return(
		<svg 
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24" 
			fill="currentColor"
			color={color}
			width={size || width}
			height={size || height}
			className={className}
			{...props}
			>
				<path d="M15.7279 9.57627L14.3137 8.16206L5 17.4758V18.89H6.41421L15.7279 9.57627ZM17.1421 8.16206L18.5563 6.74785L17.1421 5.33363L15.7279 6.74785L17.1421 8.16206ZM7.24264 20.89H3V16.6473L16.435 3.21231C16.8256 2.82179 17.4587 2.82179 17.8492 3.21231L20.6777 6.04074C21.0682 6.43126 21.0682 7.06443 20.6777 7.45495L7.24264 20.89Z"></path>
		</svg>
	)
}

export const DeleteBin: React.FC<IconSvgProps> = ({
	size,
	width,
	height,
	color,
	className,
	...props
}) => {
	return(
		<svg 
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24" 
			fill="currentColor"
			color={color}
			width={size || width}
			height={size || height}
			className={className}
			{...props}
			>
				<path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>
			</svg>
	)
}

export const EyeOff: React.FC<IconSvgProps> = ({
	size,
	width,
	height,
	color,
	className,
	...props
}) => {
	return(
		<svg 
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24" 
			fill="currentColor"
			color={color}
			width={size || width}
			height={size || height}
			className={className}
			{...props}
			>
				<path d="M4.52047 5.93457L1.39366 2.80777L2.80788 1.39355L22.6069 21.1925L21.1927 22.6068L17.8827 19.2968C16.1814 20.3755 14.1638 21.0002 12.0003 21.0002C6.60812 21.0002 2.12215 17.1204 1.18164 12.0002C1.61832 9.62282 2.81932 7.5129 4.52047 5.93457ZM14.7577 16.1718L13.2937 14.7078C12.902 14.8952 12.4634 15.0002 12.0003 15.0002C10.3434 15.0002 9.00026 13.657 9.00026 12.0002C9.00026 11.537 9.10522 11.0984 9.29263 10.7067L7.82866 9.24277C7.30514 10.0332 7.00026 10.9811 7.00026 12.0002C7.00026 14.7616 9.23884 17.0002 12.0003 17.0002C13.0193 17.0002 13.9672 16.6953 14.7577 16.1718ZM7.97446 3.76015C9.22127 3.26959 10.5793 3.00016 12.0003 3.00016C17.3924 3.00016 21.8784 6.87992 22.8189 12.0002C22.5067 13.6998 21.8038 15.2628 20.8068 16.5925L16.947 12.7327C16.9821 12.4936 17.0003 12.249 17.0003 12.0002C17.0003 9.23873 14.7617 7.00016 12.0003 7.00016C11.7514 7.00016 11.5068 7.01833 11.2677 7.05343L7.97446 3.76015Z"></path>
			</svg>
	)
}

export const EyeOn: React.FC<IconSvgProps> = ({
	size,
	width,
	height,
	color,
	className,
	...props
}) => {
	return(
		<svg 
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24" 
			fill="currentColor"
			color={color}
			width={size || width}
			height={size || height}
			className={className}
			{...props}
			>
				<path d="M1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12ZM12.0003 17C14.7617 17 17.0003 14.7614 17.0003 12C17.0003 9.23858 14.7617 7 12.0003 7C9.23884 7 7.00026 9.23858 7.00026 12C7.00026 14.7614 9.23884 17 12.0003 17ZM12.0003 15C10.3434 15 9.00026 13.6569 9.00026 12C9.00026 10.3431 10.3434 9 12.0003 9C13.6571 9 15.0003 10.3431 15.0003 12C15.0003 13.6569 13.6571 15 12.0003 15Z"></path>
			</svg>
	)
}

export const UserAdd: React.FC<IconSvgProps> = ({
	size,
	width,
	height,
	color,
	className,
	...props
}) => {
	return(
		<svg 
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24" 
			fill="currentColor"
			color={color}
			width={size || width}
			height={size || height}
			className={className}
			{...props}
			>
				<path d="M14 14.252V16.3414C13.3744 16.1203 12.7013 16 12 16C8.68629 16 6 18.6863 6 22H4C4 17.5817 7.58172 14 12 14C12.6906 14 13.3608 14.0875 14 14.252ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11ZM18 17V14H20V17H23V19H20V22H18V19H15V17H18Z"></path>
			</svg>
	)
}

export const UserProfile: React.FC<IconSvgProps> = ({
	size,
	width,
	height,
	color,
	className,
	...props
}) => {
	return(
		<svg 
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24" 
			fill="currentColor"
			color={color}
			width={size || width}
			height={size || height}
			className={className}
			{...props}
			>
				<path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13Z"></path>
			</svg>
	)
}

export const UploadImage: React.FC<IconSvgProps> = ({
	size,
	width,
	height,
	color,
	className,
	...props
}) => {
	return(
		<svg 
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24" 
			fill="currentColor"
			color={color}
			width={size || width}
			height={size || height}
			className={className}
			{...props}
			>
				<path d="M3 19H21V21H3V19ZM13 5.82843V17H11V5.82843L4.92893 11.8995L3.51472 10.4853L12 2L20.4853 10.4853L19.0711 11.8995L13 5.82843Z"></path>
			</svg>
	)
}

export const UserSetting: React.FC<IconSvgProps> = ({
	size,
	width,
	height,
	color,
	className,
	...props
}) => {
	return(
		<svg 
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24" 
			fill="currentColor"
			color={color}
			width={size || width}
			height={size || height}
			className={className}
			{...props}
			>
				<path d="M12 14V22H4C4 17.5817 7.58172 14 12 14ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM14.5946 18.8115C14.5327 18.5511 14.5 18.2794 14.5 18C14.5 17.7207 14.5327 17.449 14.5945 17.1886L13.6029 16.6161L14.6029 14.884L15.5952 15.4569C15.9883 15.0851 16.4676 14.8034 17 14.6449V13.5H19V14.6449C19.5324 14.8034 20.0116 15.0851 20.4047 15.4569L21.3971 14.8839L22.3972 16.616L21.4055 17.1885C21.4673 17.449 21.5 17.7207 21.5 18C21.5 18.2793 21.4673 18.551 21.4055 18.8114L22.3972 19.3839L21.3972 21.116L20.4048 20.543C20.0117 20.9149 19.5325 21.1966 19.0001 21.355V22.5H17.0001V21.3551C16.4677 21.1967 15.9884 20.915 15.5953 20.5431L14.603 21.1161L13.6029 19.384L14.5946 18.8115ZM18 17C17.4477 17 17 17.4477 17 18C17 18.5523 17.4477 19 18 19C18.5523 19 19 18.5523 19 18C19 17.4477 18.5523 17 18 17Z"></path>
			</svg>
	)
}

export const History: React.FC<IconSvgProps> = ({
	size,
	width,
	height,
	color,
	className,
	...props
}) => {
	return(
		<svg 
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24" 
			fill="currentColor"
			color={color}
			width={size || width}
			height={size || height}
			className={className}
			{...props}
			>
				<path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12H4C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C9.53614 4 7.33243 5.11383 5.86492 6.86543L8 9H2V3L4.44656 5.44648C6.28002 3.33509 8.9841 2 12 2ZM13 7L12.9998 11.585L16.2426 14.8284L14.8284 16.2426L10.9998 12.413L11 7H13Z"></path>
			</svg>
	)
}

export const Logout: React.FC<IconSvgProps> = ({
	size,
	width,
	height,
	color,
	className,
	...props
}) => {
	return(
		<svg 
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24" 
			fill="currentColor"
			color={color}
			width={size || width}
			height={size || height}
			className={className}
			{...props}
			>
				<path d="M4 18H6V20H18V4H6V6H4V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V18ZM6 11H13V13H6V16L1 12L6 8V11Z"></path>
			</svg>
	)
}

export const ArrowRightRi: React.FC<IconSvgProps> = ({
	size,
	width,
	height,
	color,
	className,
	...props
}) => {
	return(
		<svg 
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24" 
			fill="currentColor"
			color={color}
			width={size || width}
			height={size || height}
			className={className}
			{...props}
			>
				<path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
			</svg>
	)
}
