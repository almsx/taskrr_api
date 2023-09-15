import { STATUS_TASK } from './../../constants/status-task';
import { BaseEntity } from '../../config/base.entity';
import { ProjectsEntity } from '../../projects/entities/projects.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'task' })
export class TasksEntity extends BaseEntity {
  @Column()
  taskName: string;

  @Column()
  taskDescription: string;

  @Column({ type: 'enum', enum: STATUS_TASK })
  status: STATUS_TASK;

  @Column()
  responsableName: string;

  // Muchas tareas para un proyecto
  @ManyToOne(() => ProjectsEntity, (project) => project.tasks)
  @JoinColumn({ name: 'project_id' })
  project: ProjectsEntity;
}
