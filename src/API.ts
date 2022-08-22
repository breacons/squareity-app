/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateDonationItemPairsInput = {
  id?: string | null,
  virtualItemId: string,
  physicalItemId: string,
};

export type ModelDonationItemPairsConditionInput = {
  virtualItemId?: ModelIDInput | null,
  physicalItemId?: ModelIDInput | null,
  and?: Array< ModelDonationItemPairsConditionInput | null > | null,
  or?: Array< ModelDonationItemPairsConditionInput | null > | null,
  not?: ModelDonationItemPairsConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type DonationItemPairs = {
  __typename: "DonationItemPairs",
  id: string,
  virtualItemId: string,
  physicalItemId: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateDonationItemPairsInput = {
  id: string,
  virtualItemId?: string | null,
  physicalItemId?: string | null,
};

export type DeleteDonationItemPairsInput = {
  id: string,
};

export type CreateDonorItemInput = {
  id?: string | null,
  donorCustomerId?: string | null,
  itemId?: string | null,
  date?: string | null,
};

export type ModelDonorItemConditionInput = {
  donorCustomerId?: ModelStringInput | null,
  itemId?: ModelStringInput | null,
  date?: ModelStringInput | null,
  and?: Array< ModelDonorItemConditionInput | null > | null,
  or?: Array< ModelDonorItemConditionInput | null > | null,
  not?: ModelDonorItemConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type DonorItem = {
  __typename: "DonorItem",
  id: string,
  donorCustomerId?: string | null,
  itemId?: string | null,
  date?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateDonorItemInput = {
  id: string,
  donorCustomerId?: string | null,
  itemId?: string | null,
  date?: string | null,
};

export type DeleteDonorItemInput = {
  id: string,
};

export type CreateDonationAppointmentProposalInput = {
  id?: string | null,
  customerId: string,
  orderId: string,
  serviceId: string,
  appointmentId?: string | null,
};

export type ModelDonationAppointmentProposalConditionInput = {
  customerId?: ModelStringInput | null,
  orderId?: ModelStringInput | null,
  serviceId?: ModelStringInput | null,
  appointmentId?: ModelIDInput | null,
  and?: Array< ModelDonationAppointmentProposalConditionInput | null > | null,
  or?: Array< ModelDonationAppointmentProposalConditionInput | null > | null,
  not?: ModelDonationAppointmentProposalConditionInput | null,
};

export type DonationAppointmentProposal = {
  __typename: "DonationAppointmentProposal",
  id: string,
  customerId: string,
  orderId: string,
  serviceId: string,
  appointmentId?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateDonationAppointmentProposalInput = {
  id: string,
  customerId?: string | null,
  orderId?: string | null,
  serviceId?: string | null,
  appointmentId?: string | null,
};

export type DeleteDonationAppointmentProposalInput = {
  id: string,
};

export type CreateTokenInput = {
  accessToken: string,
  refreshToken: string,
  expiresAt: string,
  merchantId: string,
  type: TokenType,
  id?: string | null,
  projectTokensId?: string | null,
};

export enum TokenType {
  Seller = "Seller",
  Buyer = "Buyer",
}


export type ModelTokenConditionInput = {
  accessToken?: ModelStringInput | null,
  refreshToken?: ModelStringInput | null,
  expiresAt?: ModelStringInput | null,
  merchantId?: ModelStringInput | null,
  type?: ModelTokenTypeInput | null,
  and?: Array< ModelTokenConditionInput | null > | null,
  or?: Array< ModelTokenConditionInput | null > | null,
  not?: ModelTokenConditionInput | null,
  projectTokensId?: ModelIDInput | null,
};

export type ModelTokenTypeInput = {
  eq?: TokenType | null,
  ne?: TokenType | null,
};

export type Token = {
  __typename: "Token",
  project?: Project | null,
  accessToken: string,
  refreshToken: string,
  expiresAt: string,
  merchantId: string,
  type: TokenType,
  id: string,
  createdAt: string,
  updatedAt: string,
  projectTokensId?: string | null,
};

export type Project = {
  __typename: "Project",
  id: string,
  name: string,
  userId: string,
  slug: string,
  tokens?: ModelTokenConnection | null,
  defaultLocationId?: string | null,
  donationCategoryId?: string | null,
  stockCategoryId?: string | null,
  donorCustomerGroupId?: string | null,
  clientCustomerGroupId?: string | null,
  heroTitle?: string | null,
  description?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelTokenConnection = {
  __typename: "ModelTokenConnection",
  items:  Array<Token | null >,
  nextToken?: string | null,
};

export type UpdateTokenInput = {
  accessToken?: string | null,
  refreshToken?: string | null,
  expiresAt?: string | null,
  merchantId?: string | null,
  type?: TokenType | null,
  id: string,
  projectTokensId?: string | null,
};

export type DeleteTokenInput = {
  id: string,
};

export type CreateProjectInput = {
  id?: string | null,
  name: string,
  userId: string,
  slug: string,
  defaultLocationId?: string | null,
  donationCategoryId?: string | null,
  stockCategoryId?: string | null,
  donorCustomerGroupId?: string | null,
  clientCustomerGroupId?: string | null,
  heroTitle?: string | null,
  description?: string | null,
};

export type ModelProjectConditionInput = {
  name?: ModelStringInput | null,
  userId?: ModelIDInput | null,
  slug?: ModelIDInput | null,
  defaultLocationId?: ModelStringInput | null,
  donationCategoryId?: ModelStringInput | null,
  stockCategoryId?: ModelStringInput | null,
  donorCustomerGroupId?: ModelStringInput | null,
  clientCustomerGroupId?: ModelStringInput | null,
  heroTitle?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelProjectConditionInput | null > | null,
  or?: Array< ModelProjectConditionInput | null > | null,
  not?: ModelProjectConditionInput | null,
};

export type UpdateProjectInput = {
  id: string,
  name?: string | null,
  userId?: string | null,
  slug?: string | null,
  defaultLocationId?: string | null,
  donationCategoryId?: string | null,
  stockCategoryId?: string | null,
  donorCustomerGroupId?: string | null,
  clientCustomerGroupId?: string | null,
  heroTitle?: string | null,
  description?: string | null,
};

export type DeleteProjectInput = {
  id: string,
};

export type ModelDonationItemPairsFilterInput = {
  id?: ModelIDInput | null,
  virtualItemId?: ModelIDInput | null,
  physicalItemId?: ModelIDInput | null,
  and?: Array< ModelDonationItemPairsFilterInput | null > | null,
  or?: Array< ModelDonationItemPairsFilterInput | null > | null,
  not?: ModelDonationItemPairsFilterInput | null,
};

export type ModelDonationItemPairsConnection = {
  __typename: "ModelDonationItemPairsConnection",
  items:  Array<DonationItemPairs | null >,
  nextToken?: string | null,
};

export type ModelDonorItemFilterInput = {
  id?: ModelIDInput | null,
  donorCustomerId?: ModelStringInput | null,
  itemId?: ModelStringInput | null,
  date?: ModelStringInput | null,
  and?: Array< ModelDonorItemFilterInput | null > | null,
  or?: Array< ModelDonorItemFilterInput | null > | null,
  not?: ModelDonorItemFilterInput | null,
};

export type ModelDonorItemConnection = {
  __typename: "ModelDonorItemConnection",
  items:  Array<DonorItem | null >,
  nextToken?: string | null,
};

export type ModelDonationAppointmentProposalFilterInput = {
  id?: ModelIDInput | null,
  customerId?: ModelStringInput | null,
  orderId?: ModelStringInput | null,
  serviceId?: ModelStringInput | null,
  appointmentId?: ModelIDInput | null,
  and?: Array< ModelDonationAppointmentProposalFilterInput | null > | null,
  or?: Array< ModelDonationAppointmentProposalFilterInput | null > | null,
  not?: ModelDonationAppointmentProposalFilterInput | null,
};

export type ModelDonationAppointmentProposalConnection = {
  __typename: "ModelDonationAppointmentProposalConnection",
  items:  Array<DonationAppointmentProposal | null >,
  nextToken?: string | null,
};

export type ModelTokenFilterInput = {
  accessToken?: ModelStringInput | null,
  refreshToken?: ModelStringInput | null,
  expiresAt?: ModelStringInput | null,
  merchantId?: ModelStringInput | null,
  type?: ModelTokenTypeInput | null,
  and?: Array< ModelTokenFilterInput | null > | null,
  or?: Array< ModelTokenFilterInput | null > | null,
  not?: ModelTokenFilterInput | null,
  projectTokensId?: ModelIDInput | null,
};

export type ModelProjectFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  userId?: ModelIDInput | null,
  slug?: ModelIDInput | null,
  defaultLocationId?: ModelStringInput | null,
  donationCategoryId?: ModelStringInput | null,
  stockCategoryId?: ModelStringInput | null,
  donorCustomerGroupId?: ModelStringInput | null,
  clientCustomerGroupId?: ModelStringInput | null,
  heroTitle?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelProjectFilterInput | null > | null,
  or?: Array< ModelProjectFilterInput | null > | null,
  not?: ModelProjectFilterInput | null,
};

export type ModelProjectConnection = {
  __typename: "ModelProjectConnection",
  items:  Array<Project | null >,
  nextToken?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type CreateDonationItemPairsMutationVariables = {
  input: CreateDonationItemPairsInput,
  condition?: ModelDonationItemPairsConditionInput | null,
};

export type CreateDonationItemPairsMutation = {
  createDonationItemPairs?:  {
    __typename: "DonationItemPairs",
    id: string,
    virtualItemId: string,
    physicalItemId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateDonationItemPairsMutationVariables = {
  input: UpdateDonationItemPairsInput,
  condition?: ModelDonationItemPairsConditionInput | null,
};

export type UpdateDonationItemPairsMutation = {
  updateDonationItemPairs?:  {
    __typename: "DonationItemPairs",
    id: string,
    virtualItemId: string,
    physicalItemId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteDonationItemPairsMutationVariables = {
  input: DeleteDonationItemPairsInput,
  condition?: ModelDonationItemPairsConditionInput | null,
};

export type DeleteDonationItemPairsMutation = {
  deleteDonationItemPairs?:  {
    __typename: "DonationItemPairs",
    id: string,
    virtualItemId: string,
    physicalItemId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateDonorItemMutationVariables = {
  input: CreateDonorItemInput,
  condition?: ModelDonorItemConditionInput | null,
};

export type CreateDonorItemMutation = {
  createDonorItem?:  {
    __typename: "DonorItem",
    id: string,
    donorCustomerId?: string | null,
    itemId?: string | null,
    date?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateDonorItemMutationVariables = {
  input: UpdateDonorItemInput,
  condition?: ModelDonorItemConditionInput | null,
};

export type UpdateDonorItemMutation = {
  updateDonorItem?:  {
    __typename: "DonorItem",
    id: string,
    donorCustomerId?: string | null,
    itemId?: string | null,
    date?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteDonorItemMutationVariables = {
  input: DeleteDonorItemInput,
  condition?: ModelDonorItemConditionInput | null,
};

export type DeleteDonorItemMutation = {
  deleteDonorItem?:  {
    __typename: "DonorItem",
    id: string,
    donorCustomerId?: string | null,
    itemId?: string | null,
    date?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateDonationAppointmentProposalMutationVariables = {
  input: CreateDonationAppointmentProposalInput,
  condition?: ModelDonationAppointmentProposalConditionInput | null,
};

export type CreateDonationAppointmentProposalMutation = {
  createDonationAppointmentProposal?:  {
    __typename: "DonationAppointmentProposal",
    id: string,
    customerId: string,
    orderId: string,
    serviceId: string,
    appointmentId?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateDonationAppointmentProposalMutationVariables = {
  input: UpdateDonationAppointmentProposalInput,
  condition?: ModelDonationAppointmentProposalConditionInput | null,
};

export type UpdateDonationAppointmentProposalMutation = {
  updateDonationAppointmentProposal?:  {
    __typename: "DonationAppointmentProposal",
    id: string,
    customerId: string,
    orderId: string,
    serviceId: string,
    appointmentId?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteDonationAppointmentProposalMutationVariables = {
  input: DeleteDonationAppointmentProposalInput,
  condition?: ModelDonationAppointmentProposalConditionInput | null,
};

export type DeleteDonationAppointmentProposalMutation = {
  deleteDonationAppointmentProposal?:  {
    __typename: "DonationAppointmentProposal",
    id: string,
    customerId: string,
    orderId: string,
    serviceId: string,
    appointmentId?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateTokenMutationVariables = {
  input: CreateTokenInput,
  condition?: ModelTokenConditionInput | null,
};

export type CreateTokenMutation = {
  createToken?:  {
    __typename: "Token",
    project?:  {
      __typename: "Project",
      id: string,
      name: string,
      userId: string,
      slug: string,
      tokens?:  {
        __typename: "ModelTokenConnection",
        nextToken?: string | null,
      } | null,
      defaultLocationId?: string | null,
      donationCategoryId?: string | null,
      stockCategoryId?: string | null,
      donorCustomerGroupId?: string | null,
      clientCustomerGroupId?: string | null,
      heroTitle?: string | null,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    accessToken: string,
    refreshToken: string,
    expiresAt: string,
    merchantId: string,
    type: TokenType,
    id: string,
    createdAt: string,
    updatedAt: string,
    projectTokensId?: string | null,
  } | null,
};

export type UpdateTokenMutationVariables = {
  input: UpdateTokenInput,
  condition?: ModelTokenConditionInput | null,
};

export type UpdateTokenMutation = {
  updateToken?:  {
    __typename: "Token",
    project?:  {
      __typename: "Project",
      id: string,
      name: string,
      userId: string,
      slug: string,
      tokens?:  {
        __typename: "ModelTokenConnection",
        nextToken?: string | null,
      } | null,
      defaultLocationId?: string | null,
      donationCategoryId?: string | null,
      stockCategoryId?: string | null,
      donorCustomerGroupId?: string | null,
      clientCustomerGroupId?: string | null,
      heroTitle?: string | null,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    accessToken: string,
    refreshToken: string,
    expiresAt: string,
    merchantId: string,
    type: TokenType,
    id: string,
    createdAt: string,
    updatedAt: string,
    projectTokensId?: string | null,
  } | null,
};

export type DeleteTokenMutationVariables = {
  input: DeleteTokenInput,
  condition?: ModelTokenConditionInput | null,
};

export type DeleteTokenMutation = {
  deleteToken?:  {
    __typename: "Token",
    project?:  {
      __typename: "Project",
      id: string,
      name: string,
      userId: string,
      slug: string,
      tokens?:  {
        __typename: "ModelTokenConnection",
        nextToken?: string | null,
      } | null,
      defaultLocationId?: string | null,
      donationCategoryId?: string | null,
      stockCategoryId?: string | null,
      donorCustomerGroupId?: string | null,
      clientCustomerGroupId?: string | null,
      heroTitle?: string | null,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    accessToken: string,
    refreshToken: string,
    expiresAt: string,
    merchantId: string,
    type: TokenType,
    id: string,
    createdAt: string,
    updatedAt: string,
    projectTokensId?: string | null,
  } | null,
};

export type CreateProjectMutationVariables = {
  input: CreateProjectInput,
  condition?: ModelProjectConditionInput | null,
};

export type CreateProjectMutation = {
  createProject?:  {
    __typename: "Project",
    id: string,
    name: string,
    userId: string,
    slug: string,
    tokens?:  {
      __typename: "ModelTokenConnection",
      items:  Array< {
        __typename: "Token",
        accessToken: string,
        refreshToken: string,
        expiresAt: string,
        merchantId: string,
        type: TokenType,
        id: string,
        createdAt: string,
        updatedAt: string,
        projectTokensId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    defaultLocationId?: string | null,
    donationCategoryId?: string | null,
    stockCategoryId?: string | null,
    donorCustomerGroupId?: string | null,
    clientCustomerGroupId?: string | null,
    heroTitle?: string | null,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateProjectMutationVariables = {
  input: UpdateProjectInput,
  condition?: ModelProjectConditionInput | null,
};

export type UpdateProjectMutation = {
  updateProject?:  {
    __typename: "Project",
    id: string,
    name: string,
    userId: string,
    slug: string,
    tokens?:  {
      __typename: "ModelTokenConnection",
      items:  Array< {
        __typename: "Token",
        accessToken: string,
        refreshToken: string,
        expiresAt: string,
        merchantId: string,
        type: TokenType,
        id: string,
        createdAt: string,
        updatedAt: string,
        projectTokensId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    defaultLocationId?: string | null,
    donationCategoryId?: string | null,
    stockCategoryId?: string | null,
    donorCustomerGroupId?: string | null,
    clientCustomerGroupId?: string | null,
    heroTitle?: string | null,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteProjectMutationVariables = {
  input: DeleteProjectInput,
  condition?: ModelProjectConditionInput | null,
};

export type DeleteProjectMutation = {
  deleteProject?:  {
    __typename: "Project",
    id: string,
    name: string,
    userId: string,
    slug: string,
    tokens?:  {
      __typename: "ModelTokenConnection",
      items:  Array< {
        __typename: "Token",
        accessToken: string,
        refreshToken: string,
        expiresAt: string,
        merchantId: string,
        type: TokenType,
        id: string,
        createdAt: string,
        updatedAt: string,
        projectTokensId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    defaultLocationId?: string | null,
    donationCategoryId?: string | null,
    stockCategoryId?: string | null,
    donorCustomerGroupId?: string | null,
    clientCustomerGroupId?: string | null,
    heroTitle?: string | null,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetDonationItemPairsQueryVariables = {
  id: string,
};

export type GetDonationItemPairsQuery = {
  getDonationItemPairs?:  {
    __typename: "DonationItemPairs",
    id: string,
    virtualItemId: string,
    physicalItemId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListDonationItemPairsQueryVariables = {
  filter?: ModelDonationItemPairsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListDonationItemPairsQuery = {
  listDonationItemPairs?:  {
    __typename: "ModelDonationItemPairsConnection",
    items:  Array< {
      __typename: "DonationItemPairs",
      id: string,
      virtualItemId: string,
      physicalItemId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetDonorItemQueryVariables = {
  id: string,
};

export type GetDonorItemQuery = {
  getDonorItem?:  {
    __typename: "DonorItem",
    id: string,
    donorCustomerId?: string | null,
    itemId?: string | null,
    date?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListDonorItemsQueryVariables = {
  filter?: ModelDonorItemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListDonorItemsQuery = {
  listDonorItems?:  {
    __typename: "ModelDonorItemConnection",
    items:  Array< {
      __typename: "DonorItem",
      id: string,
      donorCustomerId?: string | null,
      itemId?: string | null,
      date?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetDonationAppointmentProposalQueryVariables = {
  id: string,
};

export type GetDonationAppointmentProposalQuery = {
  getDonationAppointmentProposal?:  {
    __typename: "DonationAppointmentProposal",
    id: string,
    customerId: string,
    orderId: string,
    serviceId: string,
    appointmentId?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListDonationAppointmentProposalsQueryVariables = {
  filter?: ModelDonationAppointmentProposalFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListDonationAppointmentProposalsQuery = {
  listDonationAppointmentProposals?:  {
    __typename: "ModelDonationAppointmentProposalConnection",
    items:  Array< {
      __typename: "DonationAppointmentProposal",
      id: string,
      customerId: string,
      orderId: string,
      serviceId: string,
      appointmentId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetTokenQueryVariables = {
  id: string,
};

export type GetTokenQuery = {
  getToken?:  {
    __typename: "Token",
    project?:  {
      __typename: "Project",
      id: string,
      name: string,
      userId: string,
      slug: string,
      tokens?:  {
        __typename: "ModelTokenConnection",
        nextToken?: string | null,
      } | null,
      defaultLocationId?: string | null,
      donationCategoryId?: string | null,
      stockCategoryId?: string | null,
      donorCustomerGroupId?: string | null,
      clientCustomerGroupId?: string | null,
      heroTitle?: string | null,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    accessToken: string,
    refreshToken: string,
    expiresAt: string,
    merchantId: string,
    type: TokenType,
    id: string,
    createdAt: string,
    updatedAt: string,
    projectTokensId?: string | null,
  } | null,
};

export type ListTokensQueryVariables = {
  filter?: ModelTokenFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTokensQuery = {
  listTokens?:  {
    __typename: "ModelTokenConnection",
    items:  Array< {
      __typename: "Token",
      project?:  {
        __typename: "Project",
        id: string,
        name: string,
        userId: string,
        slug: string,
        defaultLocationId?: string | null,
        donationCategoryId?: string | null,
        stockCategoryId?: string | null,
        donorCustomerGroupId?: string | null,
        clientCustomerGroupId?: string | null,
        heroTitle?: string | null,
        description?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      accessToken: string,
      refreshToken: string,
      expiresAt: string,
      merchantId: string,
      type: TokenType,
      id: string,
      createdAt: string,
      updatedAt: string,
      projectTokensId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetProjectQueryVariables = {
  id: string,
};

export type GetProjectQuery = {
  getProject?:  {
    __typename: "Project",
    id: string,
    name: string,
    userId: string,
    slug: string,
    tokens?:  {
      __typename: "ModelTokenConnection",
      items:  Array< {
        __typename: "Token",
        accessToken: string,
        refreshToken: string,
        expiresAt: string,
        merchantId: string,
        type: TokenType,
        id: string,
        createdAt: string,
        updatedAt: string,
        projectTokensId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    defaultLocationId?: string | null,
    donationCategoryId?: string | null,
    stockCategoryId?: string | null,
    donorCustomerGroupId?: string | null,
    clientCustomerGroupId?: string | null,
    heroTitle?: string | null,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListProjectsQueryVariables = {
  filter?: ModelProjectFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProjectsQuery = {
  listProjects?:  {
    __typename: "ModelProjectConnection",
    items:  Array< {
      __typename: "Project",
      id: string,
      name: string,
      userId: string,
      slug: string,
      tokens?:  {
        __typename: "ModelTokenConnection",
        nextToken?: string | null,
      } | null,
      defaultLocationId?: string | null,
      donationCategoryId?: string | null,
      stockCategoryId?: string | null,
      donorCustomerGroupId?: string | null,
      clientCustomerGroupId?: string | null,
      heroTitle?: string | null,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type PairByVirtualIdQueryVariables = {
  virtualItemId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelDonationItemPairsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PairByVirtualIdQuery = {
  pairByVirtualId?:  {
    __typename: "ModelDonationItemPairsConnection",
    items:  Array< {
      __typename: "DonationItemPairs",
      id: string,
      virtualItemId: string,
      physicalItemId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type PairByPhysicalIdQueryVariables = {
  physicalItemId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelDonationItemPairsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PairByPhysicalIdQuery = {
  pairByPhysicalId?:  {
    __typename: "ModelDonationItemPairsConnection",
    items:  Array< {
      __typename: "DonationItemPairs",
      id: string,
      virtualItemId: string,
      physicalItemId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ProposalByAppointmentIdQueryVariables = {
  appointmentId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelDonationAppointmentProposalFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ProposalByAppointmentIdQuery = {
  proposalByAppointmentId?:  {
    __typename: "ModelDonationAppointmentProposalConnection",
    items:  Array< {
      __typename: "DonationAppointmentProposal",
      id: string,
      customerId: string,
      orderId: string,
      serviceId: string,
      appointmentId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ProjectByUserQueryVariables = {
  userId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelProjectFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ProjectByUserQuery = {
  projectByUser?:  {
    __typename: "ModelProjectConnection",
    items:  Array< {
      __typename: "Project",
      id: string,
      name: string,
      userId: string,
      slug: string,
      tokens?:  {
        __typename: "ModelTokenConnection",
        nextToken?: string | null,
      } | null,
      defaultLocationId?: string | null,
      donationCategoryId?: string | null,
      stockCategoryId?: string | null,
      donorCustomerGroupId?: string | null,
      clientCustomerGroupId?: string | null,
      heroTitle?: string | null,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ProjectBySlugQueryVariables = {
  slug: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelProjectFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ProjectBySlugQuery = {
  projectBySlug?:  {
    __typename: "ModelProjectConnection",
    items:  Array< {
      __typename: "Project",
      id: string,
      name: string,
      userId: string,
      slug: string,
      tokens?:  {
        __typename: "ModelTokenConnection",
        nextToken?: string | null,
      } | null,
      defaultLocationId?: string | null,
      donationCategoryId?: string | null,
      stockCategoryId?: string | null,
      donorCustomerGroupId?: string | null,
      clientCustomerGroupId?: string | null,
      heroTitle?: string | null,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateDonationItemPairsSubscription = {
  onCreateDonationItemPairs?:  {
    __typename: "DonationItemPairs",
    id: string,
    virtualItemId: string,
    physicalItemId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateDonationItemPairsSubscription = {
  onUpdateDonationItemPairs?:  {
    __typename: "DonationItemPairs",
    id: string,
    virtualItemId: string,
    physicalItemId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteDonationItemPairsSubscription = {
  onDeleteDonationItemPairs?:  {
    __typename: "DonationItemPairs",
    id: string,
    virtualItemId: string,
    physicalItemId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateDonorItemSubscription = {
  onCreateDonorItem?:  {
    __typename: "DonorItem",
    id: string,
    donorCustomerId?: string | null,
    itemId?: string | null,
    date?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateDonorItemSubscription = {
  onUpdateDonorItem?:  {
    __typename: "DonorItem",
    id: string,
    donorCustomerId?: string | null,
    itemId?: string | null,
    date?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteDonorItemSubscription = {
  onDeleteDonorItem?:  {
    __typename: "DonorItem",
    id: string,
    donorCustomerId?: string | null,
    itemId?: string | null,
    date?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateDonationAppointmentProposalSubscription = {
  onCreateDonationAppointmentProposal?:  {
    __typename: "DonationAppointmentProposal",
    id: string,
    customerId: string,
    orderId: string,
    serviceId: string,
    appointmentId?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateDonationAppointmentProposalSubscription = {
  onUpdateDonationAppointmentProposal?:  {
    __typename: "DonationAppointmentProposal",
    id: string,
    customerId: string,
    orderId: string,
    serviceId: string,
    appointmentId?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteDonationAppointmentProposalSubscription = {
  onDeleteDonationAppointmentProposal?:  {
    __typename: "DonationAppointmentProposal",
    id: string,
    customerId: string,
    orderId: string,
    serviceId: string,
    appointmentId?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateTokenSubscription = {
  onCreateToken?:  {
    __typename: "Token",
    project?:  {
      __typename: "Project",
      id: string,
      name: string,
      userId: string,
      slug: string,
      tokens?:  {
        __typename: "ModelTokenConnection",
        nextToken?: string | null,
      } | null,
      defaultLocationId?: string | null,
      donationCategoryId?: string | null,
      stockCategoryId?: string | null,
      donorCustomerGroupId?: string | null,
      clientCustomerGroupId?: string | null,
      heroTitle?: string | null,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    accessToken: string,
    refreshToken: string,
    expiresAt: string,
    merchantId: string,
    type: TokenType,
    id: string,
    createdAt: string,
    updatedAt: string,
    projectTokensId?: string | null,
  } | null,
};

export type OnUpdateTokenSubscription = {
  onUpdateToken?:  {
    __typename: "Token",
    project?:  {
      __typename: "Project",
      id: string,
      name: string,
      userId: string,
      slug: string,
      tokens?:  {
        __typename: "ModelTokenConnection",
        nextToken?: string | null,
      } | null,
      defaultLocationId?: string | null,
      donationCategoryId?: string | null,
      stockCategoryId?: string | null,
      donorCustomerGroupId?: string | null,
      clientCustomerGroupId?: string | null,
      heroTitle?: string | null,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    accessToken: string,
    refreshToken: string,
    expiresAt: string,
    merchantId: string,
    type: TokenType,
    id: string,
    createdAt: string,
    updatedAt: string,
    projectTokensId?: string | null,
  } | null,
};

export type OnDeleteTokenSubscription = {
  onDeleteToken?:  {
    __typename: "Token",
    project?:  {
      __typename: "Project",
      id: string,
      name: string,
      userId: string,
      slug: string,
      tokens?:  {
        __typename: "ModelTokenConnection",
        nextToken?: string | null,
      } | null,
      defaultLocationId?: string | null,
      donationCategoryId?: string | null,
      stockCategoryId?: string | null,
      donorCustomerGroupId?: string | null,
      clientCustomerGroupId?: string | null,
      heroTitle?: string | null,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    accessToken: string,
    refreshToken: string,
    expiresAt: string,
    merchantId: string,
    type: TokenType,
    id: string,
    createdAt: string,
    updatedAt: string,
    projectTokensId?: string | null,
  } | null,
};

export type OnCreateProjectSubscription = {
  onCreateProject?:  {
    __typename: "Project",
    id: string,
    name: string,
    userId: string,
    slug: string,
    tokens?:  {
      __typename: "ModelTokenConnection",
      items:  Array< {
        __typename: "Token",
        accessToken: string,
        refreshToken: string,
        expiresAt: string,
        merchantId: string,
        type: TokenType,
        id: string,
        createdAt: string,
        updatedAt: string,
        projectTokensId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    defaultLocationId?: string | null,
    donationCategoryId?: string | null,
    stockCategoryId?: string | null,
    donorCustomerGroupId?: string | null,
    clientCustomerGroupId?: string | null,
    heroTitle?: string | null,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateProjectSubscription = {
  onUpdateProject?:  {
    __typename: "Project",
    id: string,
    name: string,
    userId: string,
    slug: string,
    tokens?:  {
      __typename: "ModelTokenConnection",
      items:  Array< {
        __typename: "Token",
        accessToken: string,
        refreshToken: string,
        expiresAt: string,
        merchantId: string,
        type: TokenType,
        id: string,
        createdAt: string,
        updatedAt: string,
        projectTokensId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    defaultLocationId?: string | null,
    donationCategoryId?: string | null,
    stockCategoryId?: string | null,
    donorCustomerGroupId?: string | null,
    clientCustomerGroupId?: string | null,
    heroTitle?: string | null,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteProjectSubscription = {
  onDeleteProject?:  {
    __typename: "Project",
    id: string,
    name: string,
    userId: string,
    slug: string,
    tokens?:  {
      __typename: "ModelTokenConnection",
      items:  Array< {
        __typename: "Token",
        accessToken: string,
        refreshToken: string,
        expiresAt: string,
        merchantId: string,
        type: TokenType,
        id: string,
        createdAt: string,
        updatedAt: string,
        projectTokensId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    defaultLocationId?: string | null,
    donationCategoryId?: string | null,
    stockCategoryId?: string | null,
    donorCustomerGroupId?: string | null,
    clientCustomerGroupId?: string | null,
    heroTitle?: string | null,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
