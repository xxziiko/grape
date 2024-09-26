import { atom } from 'jotai';

export const stepAtom = atom<'로그인' | '프로필설정'>('로그인');
