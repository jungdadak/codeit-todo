import { string, z } from 'zod';

/**
 * api/tanentId/items 의 응답 타입을 검증하는 스키마 입니다.
 * api 응답이 List 이기 때문에
 * GetAll_ItemsSchema 는 각 아이템을, ListSchema 에서 Array로 묶어줬습니다.
 */
export const GetAll_ItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  isCompleted: z.boolean(),
});
//실제 api 응답 구조
export const GetAll_ListSchema = z.array(GetAll_ItemSchema);

/**
 * type을 재정의 하기보다 zod 스키마에서 뽑아서 재활용
 */
export type TodoItem = z.infer<typeof GetAll_ItemSchema>;
export type TodoItemList = z.infer<typeof GetAll_ListSchema>;

/**
 * items/itemId 엔드포인트용 스키마 (서버 응답부분)
 * 상단 스키마 재활용
 */
export const Detail_ItemSchema = GetAll_ItemSchema.extend({
  memo: z.string().nullable(),
  imageUrl: z.string().nullable(),
  tenantId: z.string(),
});

export type DetailItem = z.infer<typeof Detail_ItemSchema>;
