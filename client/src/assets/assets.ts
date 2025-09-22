
interface page {
    id: number,
    page: number,
}
export const pages: page[] = [
    {
        id: 1,
        page: 1
    },
    {
        id: 2,
        page: 2,
    },
    {
        id: 3,
        page: 3,
    }


];


interface SideBarItem {
    label: string;
    id: number,
}
export const sideBarItems: SideBarItem[] = [
    {
        label: "Authors",
        id: 1,
    },
    {
        label: "Books",
        id: 2
    },
    {
        label: "Users",
        id: 3
    },
    {
        label: "Orders",
        id: 4
    }
]
