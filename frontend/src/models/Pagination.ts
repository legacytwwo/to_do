import { Model } from '@vuex-orm/core'

export class PaginationModel extends Model {
  static fields () {
    return {
      page: this.number(1),
      pageSize: this.number(1),
      itemCount: this.number(0),
    }
  }
}