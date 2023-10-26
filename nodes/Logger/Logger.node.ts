import {
	IDataObject,
	IExecuteFunctions,
	IExecuteWorkflowInfo,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';

import { DateTime } from 'luxon';

export class Logger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Logger',
		name: 'logger',
		group: ['transform'],
		version: 1,
		icon: 'file:log.svg',
		description: 'Logger Node to start a Logger Workflow',
		defaults: {
			name: 'Logger',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			// Node properties which the user gets displayed and
			// can change on the node.
			{
				displayName: 'Logger Workflow ID',
				name: 'workflowId',
				type: 'string',
				default: '',
				description: 'ID of the Logger workflow',
			},
			{
				displayName: 'Data to Be Sent to the Logger',
				name: 'dataMode',
				type: 'options',
				options:[
					{
						name:'First Item',
						value:'firstItem'
					},
					{
						name:'All Items',
						value:'allItems'
					},
					{
						name: '1 Item with Aggregated Item Values Array',
						value:'oneItemWithArray'
					},
				],
				default: 'firstItem',
				description: 'Choose between modes of operation for the logger when sending items',
			},
			{
				displayName: 'Return Data From SubFlow',
				name: 'returnDataFromSubFlow',
				type: 'boolean',
				default: false,
				description: 'Whether or not to return the data from the subflow, by default continue with data from mainflow',
			},
			{
				displayName: 'Values to Log',
				name: 'logValues',
				type: 'fixedCollection',
				placeholder: 'Add Log Value',
				typeOptions: {
					multipleValues:true,
					sortable:true,
					//multipleValueButtonText:'Add Log Value'
				},
				default: {},
				options: [
					{
						name:"logField",
						displayName:"Log Field",
						values:[
							{
								displayName: 'Name',
								name: 'name',
								type: 'string',
								default: '',
								description: 'Name of Log Value',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								description: 'Log Value',
							},
						]
					}
				],
			},
		],
	};

	// The function below is responsible for actually doing whatever this node
	// is supposed to do. In this case, we're just appending the `myString` property
	// with whatever the user has entered.
	// You can make async calls and use `await`.
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();

			try {
				const workflowInfo: IExecuteWorkflowInfo = {};
				workflowInfo.id = this.getNodeParameter('workflowId', 0) as string;
				const dataMode = this.getNodeParameter('dataMode', 0) as string;
				const workflowData = this.getWorkflow();
				const executionId = this.getExecutionId();

				let loggerInput:INodeExecutionData[] = [];
				const loggingData:IDataObject = {
					timeStamp: DateTime.now().toISO(),
					workflowId : workflowData.id,
					workflowName : workflowData.name,
					workflowIsActive : workflowData.active,
					executionId : executionId
				};


				if(dataMode ==='firstItem'){

					const logValuesParam = this.getNodeParameter('logValues.logField', 0) as IDataObject[];
					const data:IDataObject ={};
					for (const param of logValuesParam) {
						data[`${param.name}`] = param.value;
					}

					loggerInput.push({json:{...loggingData,itemIndex:0,data}});

				}
				if(dataMode ==='allItems'){
					for(let i = 0; i<items.length; i++){
						const logValuesParam = this.getNodeParameter('logValues.logField', i,[]) as IDataObject[];
						const data:IDataObject ={};

						for (const param of logValuesParam) {
							data[`${param.name}`] = param.value;
						}

						loggerInput.push({json:{...loggingData,itemIndex:i,data}});
					}
				}

				if(dataMode ==='oneItemWithArray'){
					const dataArray:IDataObject[] = []
					for(let i = 0; i<items.length; i++){
						const logValuesParam = this.getNodeParameter('logValues.logField', i,[]) as IDataObject[];
						const data:IDataObject ={};
						data.itemIndex = i;
						for (const param of logValuesParam) {
							data[`${param.name}`] = param.value;
						}
						dataArray.push(data);
					}

					loggerInput.push({json:{...loggingData,itemIndex:0,data:dataArray}});
				}


				const workflowResult: INodeExecutionData[][] = await this.executeWorkflow(workflowInfo, loggerInput);
				const returnDataFromSubFlow = this.getNodeParameter('returnDataFromSubFlow', 0, false) as boolean;
				if(returnDataFromSubFlow){
					return workflowResult;
				}
				else{
					return this.prepareOutputData(items);
				}
			}
			catch (error) {
				throw new NodeOperationError(this.getNode(), error, {

				});
			}
	}
}


