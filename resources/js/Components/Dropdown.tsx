import type {
    MenuButtonProps,
    MenuItemProps,
    MenuItemsProps,
    MenuProps,
} from "@headlessui/react";
import { Menu, Transition } from "@headlessui/react";
import type { ComponentProps, ElementType } from "react";
import { Fragment } from "react";
import { twMerge } from "tailwind-merge";

const Dropdown = ({ as = "div", className, ...props }: MenuProps<any>) => {
    return (
        <Menu {...props} {...{ as }} className={twMerge("relative", className)}>
            {props.children}
        </Menu>
    );
};

const DropdownButton = (props: MenuButtonProps<any>) => {
    return <Menu.Button {...props}>{props.children}</Menu.Button>;
};

type DropdownItemsProps = MenuItemsProps<any> & {
    withCategories?: boolean;
};

const DropdownItems = ({
    className,
    isCategories,
    ...props
}: DropdownItemsProps) => {
    return (
        <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
        >
            <Menu.Items
                {...props}
                className={twMerge(
                    "absolute mt-2 flex flex-col rounded-xl bg-white text-sm shadow-md ring-1 ring-black ring-opacity-10 focus:outline-none dark:bg-slate-900 dark:ring-white dark:ring-opacity-10",
                    isCategories
                        ? "gap-y-1 divide-y divide-slate-300 dark:divide-slate-700"
                        : "gap-y-1.5 p-2",
                    className
                )}
            >
                {props.children}
            </Menu.Items>
        </Transition>
    );
};

const DropdownCategories = (props: DropdownItemsProps) => {
    return <Dropdown.Items {...props} isCategories />;
};

type DropdownCategoryProps = ComponentProps<"ul"> & {
    label?: string;
};

const DropdownCategory = ({
    label,
    className,
    ...props
}: DropdownCategoryProps) => {
    return (
        <div className="flex flex-col gap-y-1.5 p-2">
            {label && (
                <span className="pl-2 text-xs text-slate-700 dark:text-slate-300">
                    {label.toUpperCase()}
                </span>
            )}
            <ul
                {...props}
                className={twMerge("flex flex-col gap-y-1.5", className)}
            >
                {props.children}
            </ul>
        </div>
    );
};

type DropdownItemProps = MenuItemProps<any> & {
    icon?: ElementType;
    preventClose?: boolean;
    selected?: boolean;
};

const DropdownItem = ({
    as = "button",
    className,
    icon: Icon,
    selected,
    onClick,
    preventClose,
    ...props
}: DropdownItemProps) => {
    return (
        <Menu.Item {...props} {...{ as }}>
            <div
                onClick={(event) => {
                    if (preventClose) {
                        event.preventDefault();
                        event.stopPropagation();
                    }

                    onClick?.(event);
                }}
                className={twMerge(
                    "flex h-9 items-center gap-x-2 rounded-lg px-3 py-1.5 text-start",
                    props.disabled
                        ? "cursor-default text-slate-400 dark:text-slate-600"
                        : "hover:bg-indigo-600 hover:text-white dark:hover:text-white",
                    selected && "cursor-default bg-indigo-600 text-white",
                    className
                )}
            >
                <>
                    {Icon && <Icon className="h-5 w-5" />}
                    {props.children}
                </>
            </div>
        </Menu.Item>
    );
};

Dropdown.Button = DropdownButton;
Dropdown.Items = DropdownItems;
Dropdown.Categories = DropdownCategories;
Dropdown.Category = DropdownCategory;
Dropdown.Item = DropdownItem;

export default Dropdown;
