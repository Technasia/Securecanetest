//don't touch this
import {array, date} from "yup";

interface IService {
    init: () => PVoid;
}

type Services = Record<string, IService>;

interface IStore {
    hydrate?: () => PVoid;
}

type Stores = Record<string, IStore>;

type PVoid = Promise<void>;
type AnyObj = Record<string, unknown>;
type PureFunc = () => void;

