export interface IResp {
  status:        boolean;
  data:          Data;
  message:       string;
}
export interface Data {
    has_more:        boolean;
    items:           Item[];
    quota_max:       number;
    quota_remaining: number;
}

export interface Item {
    answer_count:        number;
    content_license?:    ContentLicense;
    creation_date:       number;
    is_answered:         boolean;
    last_activity_date:  number;
    link:                string;
    owner:               Owner;
    question_id:         number;
    score:               number;
    tags:                string[];
    title:               string;
    view_count:          number;
    last_edit_date?:     number;
    accepted_answer_id?: number;
    closed_date?:        number;
    closed_reason?:      string;
}

export enum ContentLicense {
    CcBySa25 = "CC BY-SA 2.5",
    CcBySa30 = "CC BY-SA 3.0",
    CcBySa40 = "CC BY-SA 4.0",
}

export interface Owner {
    display_name:  string;
    link:          string;
    profile_image: string;
    reputation:    number;
    user_id:       number;
    user_type:     UserType;
    accept_rate?:  number;
}

export enum UserType {
    Registered = "registered",
}
