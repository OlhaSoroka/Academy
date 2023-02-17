import { SelectItem } from "../../models/options.model";

export interface IColumnDefs {
	field: string,
	headerName: string,
	headerEditable?: boolean,
	sortable?: boolean,
	editable?: boolean,
	width: number,
	minWidth?:number,
	solid?: boolean,
	link?: boolean,
	date?: boolean,
	actionColumn?: boolean;
	delete?: boolean;
	filter?: boolean;
	image? :boolean;
	homework?: boolean;
	dropdown?: boolean;
	centered?: boolean;
	options?: SelectItem[];
	checkAuthor?: boolean;
	currentUserId?: string;
  }