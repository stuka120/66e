import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State, StufenHeimstundenTimeState } from "./state";
import { StufenCardModel } from "../../components/components/stufen-card/stufen-card.model";

const getIsLoading = (state: State): boolean => state.isLoading;

const getBiberStufenInfos = (state: State): StufenCardModel =>
  state.stufenInfos ? state.stufenInfos.biber : undefined;
const getWiWoeStufenInfos = (state: State): StufenCardModel =>
  state.stufenInfos ? state.stufenInfos.wiwoe : undefined;
const getGuSpStufenInfos = (state: State): StufenCardModel => (state.stufenInfos ? state.stufenInfos.gusp : undefined);
const getCaExStufenInfos = (state: State): StufenCardModel => (state.stufenInfos ? state.stufenInfos.caex : undefined);
const getRaRoStufenInfos = (state: State): StufenCardModel => (state.stufenInfos ? state.stufenInfos.raro : undefined);
const getNeedStufenInfos = (state: State): boolean => state.needStufenInfos;

const getBiberTeaser = (state: State): StufenCardModel => (state.stufenInfos ? state.stufenTeaser.biber : undefined);
const getWiWoeTeaser = (state: State): StufenCardModel => (state.stufenInfos ? state.stufenTeaser.wiwoe : undefined);
const getGuSpTeaser = (state: State): StufenCardModel => (state.stufenInfos ? state.stufenTeaser.gusp : undefined);
const getCaExTeaser = (state: State): StufenCardModel => (state.stufenInfos ? state.stufenTeaser.caex : undefined);
const getRaRoTeaser = (state: State): StufenCardModel => (state.stufenInfos ? state.stufenTeaser.raro : undefined);
const getNeedTeaser = (state: State): boolean => state.needStufenTeaser;

const getBiberHeimstundenInfos = (state: State): StufenHeimstundenTimeState =>
  state.heimstundenInfos ? state.heimstundenInfos.biber : undefined;
const getWiWoeHeimstundenInfos = (state: State): StufenHeimstundenTimeState =>
  state.heimstundenInfos ? state.heimstundenInfos.wiwoe : undefined;
const getGuSpHeimstundenInfos = (state: State): StufenHeimstundenTimeState =>
  state.heimstundenInfos ? state.heimstundenInfos.gusp : undefined;
const getCaExHeimstundenInfos = (state: State): StufenHeimstundenTimeState =>
  state.heimstundenInfos ? state.heimstundenInfos.caex : undefined;
const getRaRoHeimstundenInfos = (state: State): StufenHeimstundenTimeState =>
  state.heimstundenInfos ? state.heimstundenInfos.raro : undefined;
const getNeedHeimstundenInfos = (state: State): boolean => state.needHeimstundenInfos;

const selectStufenInfosFeatureSelector = createFeatureSelector("stufenInfos");

export const selectBiberStufenInfos = createSelector(selectStufenInfosFeatureSelector, getBiberStufenInfos);

export const selectWiWoeStufenInfos = createSelector(selectStufenInfosFeatureSelector, getWiWoeStufenInfos);

export const selectGuSpStufenInfos = createSelector(selectStufenInfosFeatureSelector, getGuSpStufenInfos);

export const selectCaExStufenInfos = createSelector(selectStufenInfosFeatureSelector, getCaExStufenInfos);

export const selectRaRoStufenInfos = createSelector(selectStufenInfosFeatureSelector, getRaRoStufenInfos);

export const selectStufenInfosAll = createSelector(
  selectBiberStufenInfos,
  selectWiWoeStufenInfos,
  selectGuSpStufenInfos,
  selectCaExStufenInfos,
  selectRaRoStufenInfos,
  (biber, wiwoe, gusp, caex, raro) => ({
    biber,
    wiwoe,
    gusp,
    caex,
    raro
  })
);

export const selectStufenInfosIsLoading = createSelector(selectStufenInfosFeatureSelector, getIsLoading);

export const selectStufenInfosNeedStufenInfos = createSelector(selectStufenInfosFeatureSelector, getNeedStufenInfos);

// Teaser part
export const selectBiberTeaser = createSelector(selectStufenInfosFeatureSelector, getBiberTeaser);

export const selectWiWoeTeaser = createSelector(selectStufenInfosFeatureSelector, getWiWoeTeaser);

export const selectGuSpTeaser = createSelector(selectStufenInfosFeatureSelector, getGuSpTeaser);

export const selectCaExTeaser = createSelector(selectStufenInfosFeatureSelector, getCaExTeaser);

export const selectRaRoTeaser = createSelector(selectStufenInfosFeatureSelector, getRaRoTeaser);

export const selectTeasersAll = createSelector(
  selectBiberTeaser,
  selectWiWoeTeaser,
  selectGuSpTeaser,
  selectCaExTeaser,
  selectRaRoTeaser,
  (biber, wiwoe, gusp, caex, raro) => ([
    biber,
    wiwoe,
    gusp,
    caex,
    raro
  ])
);

export const selectStufenInfosNeedTeaser = createSelector(selectStufenInfosFeatureSelector, getNeedTeaser);

// Heimstunden part
export const selectBiberHeimstundenInfos = createSelector(selectStufenInfosFeatureSelector, getBiberHeimstundenInfos);

export const selectWiWoeHeimstundenInfos = createSelector(selectStufenInfosFeatureSelector, getWiWoeHeimstundenInfos);

export const selectGuSpHeimstundenInfos = createSelector(selectStufenInfosFeatureSelector, getGuSpHeimstundenInfos);

export const selectCaExHeimstundenInfos = createSelector(selectStufenInfosFeatureSelector, getCaExHeimstundenInfos);

export const selectRaRoHeimstundenInfos = createSelector(selectStufenInfosFeatureSelector, getRaRoHeimstundenInfos);

export const selectHeimstundenInfosAll = createSelector(
  selectBiberHeimstundenInfos,
  selectWiWoeHeimstundenInfos,
  selectGuSpHeimstundenInfos,
  selectCaExHeimstundenInfos,
  selectRaRoHeimstundenInfos,
  (biber, wiwoe, gusp, caex, raro) => ({
    biber,
    wiwoe,
    gusp,
    caex,
    raro
  })
);

export const selectStufenInfosNeedHeimstundenInfos = createSelector(
  selectStufenInfosFeatureSelector,
  getNeedHeimstundenInfos
);
